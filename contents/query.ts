const query = `query ($phrase: String!) {
  filterNftParallelAssets(
    phrase: $phrase,
    limit: 1,
    match: { class: FE }
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

export const getCardInfo = async (cardName: string) => {
  const response = await fetch('https://api.defined.fi/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'V1MQh8qFOi11BvKaCIFcj4vC2vFLPm6O7jdDR6QD'
    },
    body: JSON.stringify({
      query,
      variables: {
        phrase: cardName
      }
    })
  });

  const result = await response.json()
  result.data.filterNftParallelAssets.results.sort((a, b) => a - b)
  return result.data.filterNftParallelAssets.results[0]
}