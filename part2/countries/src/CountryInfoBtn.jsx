const CountryInfoBtn = ({ name, setShownCountryName }) => {
    const handleShowCountryInfo = () => {
        setShownCountryName(name);
    }

    return (
        <button onClick={handleShowCountryInfo}>show</button>
    )
}

export default CountryInfoBtn;