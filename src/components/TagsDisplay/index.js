const TagsDisplay = props => {
  const {details, tagChange} = props
  const {optionId, displayText} = details

  const onClickTag = () => tagChange(optionId)

  return (
    <li>
      <button type="button" onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagsDisplay
