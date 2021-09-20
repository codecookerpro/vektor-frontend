import { ColorButton } from 'components/UI/Buttons';
import { useMemo, useState } from 'react';

const useCardToggler = (options = {}) => {
  const { disabled = false, showLabel = 'Show', hideLabel = 'Hide', color = 'lightGreen' } = options;
  const [toggled, toggleCard] = useState(false);
  const toggleButton = useMemo(
    () => (
      <ColorButton colour={color} onClick={() => toggleCard(!toggled)} disabled={disabled}>
        {toggled ? hideLabel : showLabel}
      </ColorButton>
    ),
    [color, toggled, disabled, showLabel, hideLabel]
  );

  const Toggler = ({ children }) => (toggled ? children : null);

  return [toggleButton, Toggler, toggled];
};

export default useCardToggler;
