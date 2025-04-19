export const fetchPrice = async (trainingPeriod, couponCode = "", customerId) => {
  if (!trainingPeriod || !customerId || isNaN(trainingPeriod)) {
    return { basePrice: 0, discount: 0, finalPrice: 0 };
  }

  try {
    const response = await fetch(
      `http://localhost:8090/api/prices/calculate?trainingPeriod=${trainingPeriod}&couponCode=${couponCode}&customerId=${customerId}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      basePrice: data.basePrice ?? 0,
      discount: data.couponDiscount ?? data.discount ?? 0,
      finalPrice: data.finalPrice ?? 0,
    };
  } catch (error) {
    console.error("Price calculation error:", error);
    return { basePrice: 0, discount: 0, finalPrice: 0 };
  }
};
