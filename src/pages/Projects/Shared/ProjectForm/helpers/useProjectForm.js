import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';

import { PERMISSION_TYPE } from 'utils/constants/permissions';
import LINKS from 'utils/constants/links';
import { addProject } from 'redux/actions/projects';

import { schema } from './schema';
import { isEmpty } from 'utils/helpers/utility';

export const useProjectFrom = (
  { name = '', number = '', supervisor = '', _id: projectId = '', organization: projectOrganization = '', projectManager = '', assignedUsers = [] },
  mode
) => {
  // const [isInitiallyRendered, setInitiallyRendered] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [filteresUsers, setFilteredUsers] = useState([]);
  const [assignedUserList, setAssignedUserList] = useState([]);
  const [PMs, setPMs] = useState([]);
  const [supervizors, setSupervizors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { control, handleSubmit, errors, reset, watch, setValue } = useForm({
    resolver: joiResolver(schema),
    shouldUnregister: false,
    // defaultValues: { organization: projectOrganization, name, number, projectManager, supervisor },
  });

  const watchOrganization = watch('organization');

  const { results: users } = useSelector(({ users }) => users);
  const { permissions, organization, _id } = useSelector(({ auth }) => auth.currentUser);

  useEffect(() => {
    const initialOrganization = permissions !== PERMISSION_TYPE.ADMIN ? organization : projectOrganization;

    const { organizationUsers, pms, supervizors } = basicUserFiltering(initialOrganization);
    // const organizationUsers = users.filter((u) => u.organization === projectOrganization);
    // const pms = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
    // const supervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);
    const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER && !assignedUsers.includes(u._id));
    const assignedUserList = organizationUsers.filter((u) => assignedUsers.includes(u._id));
    // console.log(filteredUsers);
    // console.log(assignedUsers);
    // setValue('assignedUsers', assignedUsers);

    setAssignedUserList(assignedUserList);
    setPMs(pms);
    setSupervizors(supervizors);
    setFilteredUsers(filteredUsers);

    const values = {
      name,
      number,
      // supervisor,
      // projectOrganization,
      projectManager,
    };

    reset(values);
    // setValue('organization', projectOrganization);

    if (mode === 'CREATION') {
      setValue('organization', permissions !== PERMISSION_TYPE.ADMIN ? organization : '');
      setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
    } else {
      setValue('supervisor', supervisor);
      setValue('organization', projectOrganization);
    }
    // setInitiallyRendered(true);

    // reset({ name, number });
    // if (permissions !== PERMISSION_TYPE.ADMIN) {
    //   setValue('organization', mode === 'CREATION' ? organization : projectOrganization);
    // } else {
    //   setValue('organization', mode === 'CREATION' ? '' : projectOrganization);
    // }
  }, [name, number, projectManager, projectOrganization, supervisor, users]);

  useEffect(() => {
    if (currentOrganization) {
      const { organizationUsers, pms, supervizors } = basicUserFiltering(currentOrganization);
      // const organizationUsers = users.filter((u) => u.organization === currentOrganization);
      // const pms = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
      // const supervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);
      const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER);

      setPMs(pms);
      setSupervizors(supervizors);
      setFilteredUsers(filteredUsers);
      setValue('projectManager', '');

      if (mode === 'CREATION') {
        setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
      } else {
        setValue('supervisor', '');
      }
    }

    // const organizationUsers = users.filter((u) => u.organization === currentOrganization);
    // const pms = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
    // const supervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);
    // const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER);
    // console.log('!!!!!', currentOrganization);
    // setPMs(pms);
    // setSupervizors(supervizors);
    // setFilteredUsers(filteredUsers);
    // setValue('projectManager', '');
    // setValue('supervisor', '');

    // setValue('projectManager', isInitiallyRendered ? projectManager : '');
    // if (mode === 'CREATION') {
    //   setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
    // } else {
    //   setValue('supervisor', isInitiallyRendered ? supervisor : '');
    // }
  }, [currentOrganization]);

  const basicUserFiltering = (organization) => {
    const organizationUsers = users.filter((u) => u.organization === organization);
    const pms = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
    const supervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);

    return { organizationUsers, pms, supervizors };
  };

  const handleAssignedUsers = useCallback((users) => {
    const assignedUserIds = users.map((u) => u._id);
    setValue('assignedUsers', assignedUserIds);
  }, []);

  const onSubmit = (addNew) =>
    handleSubmit(async (data) => {
      const { name, number, organization, assignedUsers, projectManager, supervisor } = data;
      const params = {
        name,
        number,
        organization,
        phases: [],
        assignedUsers,
        ...(!isEmpty(projectId) && {
          _id: projectId,
        }),
        ...(!isEmpty(supervisor) && {
          supervisor,
        }),
        ...(!isEmpty(projectManager) && {
          projectManager,
        }),
      };

      const isCompleted = await dispatch(addProject(params));

      if (isCompleted) {
        if (addNew) {
          reset({
            name: '',
            number: '',
            organization: '',
            pm: '',
            supervisor: '',
          });
        } else {
          history.push(LINKS.PROJECTS.HREF);
        }
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
