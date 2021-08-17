function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

const TruncateText = ({text, length}) => truncateString(text, length);

export default TruncateText;