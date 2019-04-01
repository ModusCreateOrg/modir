import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ListItemProps from '../../models/ListItemProps';
import Modite, { defaultModite } from '../../models/Modite';
import ModiteProfileResp from '../../models/ModiteProfileResp';
import ModiteContext from '../../state/modite';
import ModiteImage from '../ModiteImage';
import s from './styles.module.css';

const ModiteListItem: FunctionComponent<ListItemProps & RouteComponentProps> = ({
  modite,
  history,
}) => {
  const [activeModite, setActiveModite]: [Modite, React.Dispatch<any>] = useContext(ModiteContext);

  return (
    <div className={s.itemInnerCt}>
      {modite.profile && (
        <div aria-hidden='true' className={s.thumbContainer}>
          <ModiteImage modite={modite} />
        </div>
      )}
      <div className={s.nameCt}>{modite.real_name}</div>
      <div aria-hidden='true' className={s.todCt}>
        {modite.tod}
      </div>
      <div className={s.localTime}>{modite.localTime}</div>
    </div>
  );
};
export default withRouter(ModiteListItem);
