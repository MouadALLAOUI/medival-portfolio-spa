import {
  FileText,
  FileSpreadsheet,
  Presentation,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  File,
} from 'lucide-react';

/** Extract file extension from any path or URL */
export const getExt = (path) => {
  const match = (path || '').match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match ? match[1].toLowerCase() : '';
};

/** Classify a file extension into a semantic type */
export const classifyFile = (ext) => {
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'doc';
  if (['xls', 'xlsx', 'ods', 'csv'].includes(ext)) return 'spreadsheet';
  if (['ppt', 'pptx', 'odp'].includes(ext)) return 'presentation';
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif', 'bmp', 'ico'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(ext)) return 'audio';
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)) return 'archive';
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'php', 'rb', 'go', 'rs', 'html', 'css', 'scss', 'json', 'xml', 'yaml', 'yml', 'sh', 'bash'].includes(ext)) return 'code';
  return 'generic';
};

/** Map each file type to its Lucide icon component and CSS color-class name */
export const FILE_TYPE_META = {
  pdf:          { Icon: FileText,         colorClass: 'fileIconPdf' },
  doc:          { Icon: FileText,         colorClass: 'fileIconDoc' },
  spreadsheet:  { Icon: FileSpreadsheet,  colorClass: 'fileIconSpreadsheet' },
  presentation: { Icon: Presentation,     colorClass: 'fileIconPresentation' },
  image:        { Icon: FileImage,        colorClass: 'fileIconImage' },
  video:        { Icon: FileVideo,        colorClass: 'fileIconVideo' },
  audio:        { Icon: FileAudio,        colorClass: 'fileIconAudio' },
  archive:      { Icon: FileArchive,      colorClass: 'fileIconArchive' },
  code:         { Icon: FileCode,         colorClass: 'fileIconCode' },
  generic:      { Icon: File,             colorClass: 'fileIconGeneric' },
};

/** Whether this ext triggers a forced browser download */
export const isDownloadExt = (ext) =>
  ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'odp', 'ods', 'zip', 'rar', '7z', 'tar', 'gz'].includes(ext);
