const getAllCardsNameQuery = `query {
  filterNftParallelAssets(
    match: { class: FE },
    limit: 1000
  ) {
    results {
      name
      tokenId
      media {
        image
      }
      gameData {
        cost
        attack
        health
        cardType
        subtype
        functionText
        passiveAbility
      }
    }
  }
}`

export const getAllCards = async () => {
  const response = await fetch('https://api.defined.fi/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'V1MQh8qFOi11BvKaCIFcj4vC2vFLPm6O7jdDR6QD'
    },
    body: JSON.stringify({
      query: getAllCardsNameQuery,
    })
  });

  const result = await response.json()
  return result.data.filterNftParallelAssets.results
}
