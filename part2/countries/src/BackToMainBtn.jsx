const BackToMainBtn = ({ setShownCountryName }) => {
    const handleBackToMain = () => {
        setShownCountryName(null);
    }

    return (
        <button onClick={handleBackToMain}>Back to main page</button>
    )
}

export default BackToMainBtn;