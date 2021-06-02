import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';

import { PERMISSION_TYPE } from 'utils/constants/permissions';
import LINKS from 'utils/constants/links';
import { addProject } from 'redux/actions/projects';

import { schema } from './schema';
import { isEmpty } from 'utils/helpers/utility';

export const useProjectFrom = () => {
  const [filteresUsers, setFilteredUsers] = useState([]);
  const [PMs, setPMs] = useState([]);
  const [supervizors, setSupervizors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { control, handleSubmit, errors, reset, watch, setValue } = useForm({
    resolver: joiResolver(schema),
    shouldUnregister: false,
  });

  const watchOrganization = watch('organization');

  const { results: users } = useSelector(({ users }) => users);
  const { permissions, organization, _id } = useSelector(({ auth }) => auth.currentUser);

  useEffect(() => {
    if (permissions !== PERMISSION_TYPE.ADMIN) {
      setValue('organization', organization);
    }
  }, [organization, permissions, setValue]);

  useEffect(() => {
    const organizationUsers = users.filter((u) => u.organization === watchOrganization);
    const pms = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.PROJECT_MANAGER);
    const supervizors = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.SUPERVISOR);
    const filteredUsers = organizationUsers.filter((u) => u.permissions === PERMISSION_TYPE.USER);

    setPMs(pms);
    setSupervizors(supervizors);
    setFilteredUsers(filteredUsers);
    setValue('pm', '');
    setValue('supervisor', permissions === PERMISSION_TYPE.SUPERVISOR ? _id : '');
  }, [watchOrganization, users, setValue, permissions, _id]);

  const handleAssignedUsers = useCallback(
    (users) => {
      const assignedUserIds = users.map((u) => u._id);
      setValue('assignedUsers', assignedUserIds);
    },
    [setValue]
  );

  const onSubmit = (addNew) =>
    handleSubmit(async (data) => {
      const params = {
        name: data.name,
        number: data.number.toString(),
        organization: data.organization,
        phases: [],
        assignedUsers: data.assignedUsers,
        ...(!isEmpty(data.pm) && {
          projectManager: data.pm,
        }),
        ...(!isEmpty(data.supervisor) && {
          supervisor: data.supervisor,
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
    organization: watchOrganization,
    onSubmit,
    handleAssignedUsers,
  };
};
