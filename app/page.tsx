export default function Home() {
  return (
    <div>
      <h1>More Dogs With Jobs</h1>
      <p>0 signatures</p>
      <p>We believe that dogs should be allowed to work in spätis! Help us make this happen by adding your name to our petition. 100,000 names and the Berlin Senat will be forced to hear our demands</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Your name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Your email" />
        <label htmlFor="comment">Comment:</label>
        <input type="text" id="comment" placeholder="Leave a comment..." />
        <label htmlFor="consent">I agree to have my name counted and to be contacted about this petition.</label>
        <input type="checkbox" id="consent" />
        <button type="submit">Sign petition</button>
      </form>
    </div>
  );
}
