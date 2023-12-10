const CountryItem = (props) => {
    const {name, showAction} = props
    return(
      <p>{name} <button onClick={showAction}>show</button></p>
    )
}

export default CountryItem