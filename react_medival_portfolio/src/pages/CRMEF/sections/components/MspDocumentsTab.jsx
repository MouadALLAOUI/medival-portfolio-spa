import { useSettings } from '../../../../lib/useSettings';
import { crmefMspDoc } from '../../../../data/crmef.data';
import FileLink from '../../../../components/FileLink/FileLink';
import FileGroupSection from '../FileGroupSection';
import ImageCarousel from '../../../../components/ImageCarousel/ImageCarousel';
import styles from '../CrmefMspPage.module.scss';

export default function MspDocumentsTab() {
  const { t } = useSettings();

  const renderFileCard = (fileItem, index, groupLabel) => {
    const isObject = typeof fileItem === 'object' && fileItem !== null;
    const filePath = isObject ? fileItem.path : fileItem;
    const localizedName = isObject && fileItem.name ? t(fileItem.name) : null;
    const fileLabel = localizedName || (isObject ? fileItem.label : null) || `${groupLabel} #${index + 1}`;

    const meta = {};
    if (isObject && fileItem.meta?.date) meta.date = fileItem.meta.date;
    if (isObject && fileItem.meta?.size) meta.size = fileItem.meta.size;
    if (isObject && fileItem.meta?.author) meta.author = fileItem.meta.author;

    return (
      <FileLink
        key={filePath}
        filePath={filePath}
        label={fileLabel}
        meta={meta}
        t={t}
        tooltipKey="CRMEF_SEMESTERS.tooltip"
      />
    );
  };

  return (
    <div className={styles.tabContent}>
      <FileGroupSection
        icon=""
        label={t('CRMEF.msp.documents.official')}
        files={crmefMspDoc.official}
        renderFileCard={renderFileCard}
      />

      <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.documents.images')}</h3>
      <ImageCarousel images={crmefMspDoc.images} />
    </div>
  );
}
