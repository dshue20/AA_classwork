export const fetchBenches = benches => {
    return $.ajax({
      method: 'GET',
      url: 'api/benches',
      error: (err) => console.log(err),
      data: {benches}
    })
}