import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faInbox, faFeatherPointed } from '@fortawesome/free-solid-svg-icons'

export const PRIORITY_CONFIG = {
  high: { icon: <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-orange-400" />, color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-200' },
  medium: { icon: <FontAwesomeIcon icon={faInbox} className='w-4 h-4'/>, color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  low: { icon: <FontAwesomeIcon icon={faFeatherPointed} className='w-4 h-4'/>, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-200' }
};

export const CATEGORY_CONFIG = {
  personal: { icon: '', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  work: { icon: '💼', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  shopping: { icon: '🛒', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  health: { icon: '💊', color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  learning: { icon: '📚', color: 'indigo', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' }
};