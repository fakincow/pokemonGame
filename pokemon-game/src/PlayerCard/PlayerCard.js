import styles from './Card.module.scss';
import image from '../assets/pok1.png';
import image2 from '../assets/pok2.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

const PlayerCard = ({ label, hitPonts ,enemy }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Avatar}>
        <img src={(enemy) ? image : image2}></img>
        <label className={styles.User}>{label}</label>
      </div>
      <div style={{ padding: "10px " }}>
        <ProgressBar now={hitPonts} />
      </div>
      <div>
        <label>{hitPonts}/ 100 </label>
      </div>
    </div>
  )
};

PlayerCard.propTypes = {};

PlayerCard.defaultProps = {};

export default PlayerCard;
