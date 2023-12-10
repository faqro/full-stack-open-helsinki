const Filter = (props) => {
    const {onFilter} = props
  
    return(
      <p>find countries <input onChange={onFilter} /></p>
    )
}

export default Filter