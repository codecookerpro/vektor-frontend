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

export const useProjectFrom = (project, mode) => {
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [filteresUsers, setFilteredUsers] = useState([]);
  const [assignedUserList, setAssignedUserList] = useState([]);
  const [PMs, setPMs] = useState([{ _id: project.projectManager, name: '---' }]);
  const [supervizors, setSupervizors] = useState([{ _id: project.supervisor, name: '---' }]);

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
      const filteredSupervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);

      const pms = filteredPMs.length > 0 ? [...filteredPMs, { _id: '', name: '---' }] : [{ _id: projectManager, name: '---' }];
      const supervizors = filteredSupervizors.length > 0 ? [...filteredSupervizors, { _id: '', name: '---' }] : [{ _id: supervisor, name: '---' }];

      return { organizationUsers, pms, supervizors };
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

  useEffect(() => {
    const { organization: projectOrganization, assignedUsers, name, number, projectManager, supervisor } = project;

    const initialOrganization = permissions !== PERMISSION_TYPE.ADMIN ? organization : projectOrganization;

    const { organizationUsers, pms, supervizors } = getBasicUserFiltering(initialOrganization);
    const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER && !assignedUsers.includes(u._id));
    const assignedUserList = organizationUsers.filter((u) => assignedUsers.includes(u._id));

    setAssignedUserList(assignedUserList);
    setPMs(pms);
    setSupervizors(supervizors);
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
      const { organizationUsers, pms, supervizors } = getBasicUserFiltering(currentOrganization);
      const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER);

      setPMs(pms);
      setSupervizors(supervizors);
      setFilteredUsers(filteredUsers);

      if (mode === PROJECT_MODES.CREATION) {
        setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
      } else {
        setValue('supervisor', '');
      }
      setValue('projectManager', projectManager);
    }
  }, [currentOrganization, mode, permissions]);

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
        await dispatch(editProject(params));
      }
    });

  return {
    errors,
    control,
    PMs,
    supervizors,
    filteresUsers,
    assignedUserList,
    organization: watchOrganization,
    onSubmit,
    handleAssignedUsers,
    setCurrentOrganization,
  };
};
