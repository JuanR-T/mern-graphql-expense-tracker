const capitalizeLetter = (description: String, category: String, paymentType: String) => {
    const capitalizedDescription = description[0]?.toUpperCase() + description.slice(1);
    const capitalizedCategory = category[0]?.toUpperCase() + category.slice(1);
    const capitalizedPaymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

    return { capitalizedDescription, capitalizedCategory, capitalizedPaymentType };
}

export default capitalizeLetter