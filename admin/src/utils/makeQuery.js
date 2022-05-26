export default function makeQuery(object) {
  let query = `?`;
  let values = Object.entries(object);
  values.forEach((value, index) => {
    query += `${value[0]}=${value[1] === 0 ? 0 : value[1] || ''}`;
    if (index !== values.length - 1) {
      query += `&`;
    }
  });

  return query;
}
