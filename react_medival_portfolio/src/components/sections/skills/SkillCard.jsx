import DynamicCard from '../../card';
import { PRESETS } from '../../../config/presets';
import styles from './SkillCard.module.scss';

const SkillCard = ({ skill, onClick, t }) => {
  return (
    <DynamicCard
      item={skill}
      config={{
        ...PRESETS.LANGUAGE, // Skills use a similar layout to language cards
        baseClass: styles['skill-card'],
        showStars: true
      }}
      onClick={onClick}
    >
      <div className={styles['skill-name-container']}>
        <span className={styles['skill-icon']}>{skill.icon}</span>
        <h3 className={styles['skill-name']}>{skill.name}</h3>
      </div>
      <p className={styles['skill-description']} dangerouslySetInnerHTML={{ __html: skill.description }} />
      <div className={styles['proficiency']} title={t('HOME.SKILLS.level', { level: skill.level })}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <span key={idx} className={`${styles['star']} ${idx < skill.level ? '' : styles['empty']}`}>★</span>
        ))}
        <div className={styles['tooltip']}>
          <span className={styles['tooltip-title']}>
            {t(`HOME.SKILLS.levelName.${skill.level}`) || `Level ${skill.level}`}
          </span>
          <p className={styles['tooltip-desc']}>
            {t(`HOME.SKILLS.levelDesc.${skill.level}`)}
          </p>
        </div>
      </div>
    </DynamicCard>
  );
};

export default SkillCard;
