export default function Grades() {
  return (
    <div id="wd-grades">
      <h1>Grades</h1>
      <table border={1} cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            <th>Assignment</th><th>Points</th><th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>A1 – ENV + HTML</td><td>100</td><td>100</td></tr>
          <tr><td>A2 – CSS + BOOTSTRAP</td><td>100</td><td>99</td></tr>
          <tr><td>A3 – JS + REACT</td><td>100</td><td>—</td></tr>
        </tbody>
      </table>
      <p><a href="../Home">Back to Home</a></p>
    </div>
  );
}
