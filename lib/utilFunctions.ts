const formatCurrency = (price: number) => {
    return (Math.round(price) / 100).toFixed(2);
}

export { formatCurrency }