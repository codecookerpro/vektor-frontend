import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';

import { PERMISSION_TYPE } from 'utils/constants/permissions';
import { PROJECT_MODES } from 'utils/constants/projectModes';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import { addProject, editProject } from 'redux/actions/projects';

import { schema } from './schema';

const useProjectFrom = (project, mode) => {
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [filteresUsers, setFilteredUsers] = useState([]);
  const [assignedUserList, setAssignedUserList] = useState([]);
  const [PMs, setPMs] = useState([{ _id: project.projectManager, name: '---' }]);
  const [supervisors, setSupervisors] = useState([{ _id: project.supervisor, name: '---' }]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { control, handleSubmit, errors, reset, watch, setValue } = useForm({
    resolver: joiResolver(schema),
    shouldUnregister: false,
  });

  const watchOrganization = watch('organization');

  const { results: users } = useSelector(({ users }) => users);
  const { permissions, organization, _id } = useSelector(({ auth }) => auth.currentUser);

  const getBasicUserFiltering = useCallback(
    (organization) => {
      const { projectManager, supervisor } = project;

      const organizationUsers = users.filter((u) => u.organization === organization);
      const filteredPMs = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
      const filteredSupervisors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);

      const pms = filteredPMs.length > 0 ? [...filteredPMs, { _id: '', name: '---' }] : [{ _id: projectManager, name: '---' }];
      const supervisors = filteredSupervisors.length > 0 ? [...filteredSupervisors, { _id: '', name: '---' }] : [{ _id: supervisor, name: '---' }];

      return { organizationUsers, pms, supervisors };
    },
    [project, users]
  );

  const handleAssignedUsers = useCallback(
    (users) => {
      const assignedUserIds = users.map((u) => u._id);
      setValue('assignedUsers', assignedUserIds);
    },
    [setValue]
  );

  const onSubmit = (addNew) =>
    handleSubmit(async (data) => {
      const { _id: projectId } = project;
      const { name, number, organization, assignedUsers, projectManager, supervisor } = data;

      const params = {
        name,
        number,
        organization,
        assignedUsers,
        ...(!isEmpty(projectId) ? { _id: projectId } : { phases: [] }),
        ...(!isEmpty(supervisor) ? { supervisor } : { supervisor: null }),
        ...(!isEmpty(projectManager) ? { projectManager } : { projectManager: null }),
      };

      if (mode === PROJECT_MODES.CREATION) {
        const isCompleted = await dispatch(addProject(params));

        if (isCompleted) {
          if (addNew) {
            reset({
              name: '',
              number: '',
              organization: '',
              projectManager: '',
              supervisor: '',
            });
          } else {
            history.push(LINKS.PROJECTS.HREF);
          }
        }
      } else {
        dispatch(editProject(params));
      }
    });

  useEffect(() => {
    const { organization: projectOrganization, assignedUsers, name, number, projectManager, supervisor } = project;

    const initialOrganization = permissions !== PERMISSION_TYPE.ADMIN ? organization : projectOrganization;

    const { organizationUsers, pms, supervisors } = getBasicUserFiltering(initialOrganization);
    const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER && !assignedUsers.includes(u._id));
    const assignedUserList = organizationUsers.filter((u) => assignedUsers.includes(u._id));

    setAssignedUserList(assignedUserList);
    setPMs(pms);
    setSupervisors(supervisors);
    setFilteredUsers(filteredUsers);
    reset({ name, number });
    setValue('projectManager', projectManager);

    if (mode === PROJECT_MODES.CREATION) {
      setValue('organization', permissions !== PERMISSION_TYPE.ADMIN ? organization : '');
      setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
    } else {
      setValue('supervisor', supervisor);
      setValue('organization', projectOrganization);
    }
  }, [_id, getBasicUserFiltering, mode, organization, permissions, project, reset, setValue, users]);

  useEffect(() => {
    if (currentOrganization) {
      const { projectManager } = project;
      const { organizationUsers, pms, supervisors } = getBasicUserFiltering(currentOrganization);
      const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER);

      setPMs(pms);
      setSupervisors(supervisors);
      setFilteredUsers(filteredUsers);

      if (mode === PROJECT_MODES.CREATION) {
        setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
      } else {
        setValue('supervisor', '');
      }
      setValue('projectManager', projectManager);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, currentOrganization, mode, permissions, project, setValue]);

  return {
    errors,
    control,
    PMs,
    supervisors,
    filteresUsers,
    assignedUserList,
    organization: watchOrganization,
    onSubmit,
    handleAssignedUsers,
    setCurrentOrganization,
  };
};

export default useProjectFrom;
