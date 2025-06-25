export default async function decorate(block) {
  [...block.children].forEach(attribute => {
    const title = row.children[0];
    const body = row.children[1];
    const rating = row.children[2].children[0];
    title.className="title";
    body.className="body";
    rating.className="rating";

    const ratingValue = transformRating(rating.innerHTML);

  })

}

function transformRating(value) {
  return '*'.repeat(value);
}
