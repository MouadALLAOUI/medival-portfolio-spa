import { useSettings } from '../../lib/useSettings';
import styles from './ChatWindow.module.scss';

export default function ContextIndicator({ contextStatus, paraCount, sentenceCount, entityCount }) {
  const { t } = useSettings();

  return (
    <div className={styles['context-indicator']}>
      <div>
        {t('COMMON.chatbot.context') || 'Context:'} <strong>{contextStatus}</strong>
      </div>
      <div className={styles['context-stats']}>
        <div className={styles['stat-box']}>
          {t('COMMON.chatbot.statParagraphs') || 'Paragraphs'} <span className={styles['stat-value']}>{paraCount}</span>
        </div>
        <div className={styles['stat-box']}>
          {t('COMMON.chatbot.statSentences') || 'Sentences'} <span className={styles['stat-value']}>{sentenceCount}</span>
        </div>
        <div className={styles['stat-box']}>
          {t('COMMON.chatbot.statEntities') || 'Entities'} <span className={styles['stat-value']}>{entityCount}</span>
        </div>
      </div>
    </div>
  );
}
