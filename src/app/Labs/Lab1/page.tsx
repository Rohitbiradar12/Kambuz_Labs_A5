"use client";
export default function Lab1() {
  return (
    <section>
      <h1>Lab 1 — HTML Lab Exercises</h1>

      <h2>Student</h2>
      <p>
        <strong>Full Name:</strong> Rohit Biradar
      </p>
      <p>
        <strong>Section:</strong> 04
      </p>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short title or
        heading that attempts to summarize the topic of the section it precedes.
        For instance this paragraph is preceded by the heading Heading Tags. The
        font of the section headings are usually larger and bolder than their
        subsection headings. This document uses headings to introduce topics
        such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
        can be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes: h1, h2,
        h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
        heading.
      </div>
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1"> ... </p>
        This is the first paragraph. The paragraph tag is used to format
        vertical gaps between long pieces of text like this one. This is the
        second paragraph. Even though there is a deliberate white gap between
        the paragraph above and this paragraph, by default browsers render them
        as one contiguous piece of text as shown here on the right. This is the
        third paragraph. Wrap each paragraph with the paragraph tag to tell
        browsers to render the gaps.
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>
      <div id="wd-lists">
        <h4>List Tags</h4>

        <h5>Ordered List Tag</h5>

        <p>How to make pancakes:</p>
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        <p>
          My favorite recipe: <strong>Masala Corn &amp; Cheese Sandwich</strong>
        </p>
        <ol id="wd-my-favorite-recipe">
          <li>Butter two slices of bread on one side.</li>
          <li>Spread green chutney on the un-buttered sides.</li>
          <li>Layer boiled corn, chopped onions, and capsicum.</li>
          <li>Sprinkle a pinch of salt, chaat masala, and chili flakes.</li>
          <li>Add a slice of cheese; close the sandwich.</li>
          <li>Toast on a hot skillet until both sides are golden.</li>
          <li>Cut diagonally and serve with ketchup or chutney.</li>
        </ol>
        <h5>Unordered List Tag</h5>
        <p>My favorite books</p>
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender’s Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>

        <p>favorite books</p>
        <ul id="wd-your-books">
          <li>The Pragmatic Programmer</li>
          <li>Clean Code</li>
          <li>Atomic Habits</li>
          <li>1984</li>
          <li>To Kill a Mockingbird</li>
        </ul>
      </div>

      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td align="right">85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td align="right">90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>Flexbox &amp; Layout</td>
              <td>2/17/21</td>
              <td align="right">92</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>Semantic HTML</td>
              <td>2/24/21</td>
              <td align="right">88</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td valign="top">Forms</td>
              <td>3/3/21</td>
              <td align="right">94</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>Accessibility</td>
              <td>3/10/21</td>
              <td align="right">91</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>Images &amp; Media</td>
              <td>3/17/21</td>
              <td align="right">89</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>Tables</td>
              <td>3/24/21</td>
              <td align="right">93</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Links &amp; Navigation</td>
              <td>3/31/21</td>
              <td align="right">87</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>HTML Review</td>
              <td>4/7/21</td>
              <td align="right">91</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td align="right">90</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <section id="wd-images">
        <h4>Image tag</h4>

        <table role="presentation" width="100%">
          <tbody>
            <tr>
              <td align="center" width="33%">
                <img
                  id="wd-react"
                  width="220"
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/React-icon.svg"
                  alt="React library logo"
                />
                <div>React logo</div>
              </td>
              <td align="center" width="33%">
                <img
                  id="wd-k8s"
                  width="220"
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Kubernetes%20logo%20without%20workmark.svg"
                  alt="Kubernetes logo"
                />
                <div>Kubernetes logo</div>
              </td>
              <td align="center" width="33%">
                <img
                  id="wd-vscode"
                  width="220"
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Visual_Studio_Code_1.35_icon.svg"
                  alt="Visual Studio Code icon"
                />
                <div>Visual Studio Code icon</div>
              </td>
            </tr>

            <tr>
              <td align="center" colSpan={3}>
                <img
                  id="wd-nu"
                  width="400"
                  src="/NU_IMG.svg"
                  alt="Northeastern University logo"
                />
                <div>Northeastern logo</div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div id="wd-forms">
        <h4>Form Elements</h4>

        <form id="wd-text-fields" action="#" method="get">
          <fieldset>
            <legend>Text Fields</legend>
            <table role="presentation" cellPadding={6} cellSpacing={4}>
              <tbody>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-username">Username:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-username"
                      name="username"
                      type="text"
                      placeholder="jdoe"
                      autoComplete="username"
                      required
                      size={28}
                    />
                    &nbsp;<small>Use 3–16 letters or numbers.</small>
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-password">Password:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-password"
                      name="password"
                      type="password"
                      defaultValue="123@#$asd"
                      autoComplete="current-password"
                      required
                      size={28}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-first-name">
                      First name:
                    </label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-first-name"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      size={28}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-last-name"
                      name="lastName"
                      type="text"
                      defaultValue="Wonderland"
                      size={28}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-email">Email:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-email"
                      name="email"
                      type="email"
                      placeholder="jdoe@example.com"
                      size={28}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-phone">Phone:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
                      size={28}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-url">Portfolio URL:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-url"
                      name="portfolio"
                      type="url"
                      placeholder="https://rohitportfolio-v1.vercel.app/"
                      size={36}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <fieldset>
            <legend>More Fields</legend>
            <table role="presentation" cellPadding={6} cellSpacing={4}>
              <tbody>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-dob">Date of Birth:</label>
                  </td>
                  <td>
                    <input id="wd-text-fields-dob" name="dob" type="date" />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-salary">Salary (USD):</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-salary"
                      name="salary"
                      type="number"
                      placeholder="50000"
                      min={0}
                      step={1000}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-rating">Rating:</label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-rating"
                      name="rating"
                      type="range"
                      min={1}
                      max={10}
                      defaultValue={7}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-text-fields-resume">
                      Upload resume:
                    </label>
                  </td>
                  <td>
                    <input
                      id="wd-text-fields-resume"
                      name="resume"
                      type="file"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right" valign="top">
                    <label htmlFor="wd-textarea-bio">Short bio:</label>
                  </td>
                  <td>
                    <textarea
                      id="wd-textarea-bio"
                      name="bio"
                      rows={4}
                      cols={40}
                      placeholder="Tell us a bit about yourself…"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <fieldset>
            <legend>Preferences</legend>

            <p>Favorite Programming Language:</p>
            <table role="presentation" cellPadding={4}>
              <tbody>
                <tr>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="favLang"
                        value="javascript"
                        defaultChecked
                      />{" "}
                      JavaScript
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="typescript" />{" "}
                      TypeScript
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="python" />{" "}
                      Python
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="java" /> Java
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="cpp" /> C++
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="go" /> Go
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="favLang" value="rust" /> Rust
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            <p>Languages you use (checkbox):</p>
            <table role="presentation" cellPadding={4}>
              <tbody>
                <tr>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        name="langs"
                        value="javascript"
                        defaultChecked
                      />{" "}
                      JavaScript
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" name="langs" value="typescript" />{" "}
                      TypeScript
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" name="langs" value="python" />{" "}
                      Python
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" name="langs" value="java" /> Java
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" name="langs" value="cpp" /> C++
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" name="langs" value="go" /> Go
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        name="langs"
                        value="rust"
                        defaultChecked
                      />{" "}
                      Rust
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            <table role="presentation" cellPadding={6} cellSpacing={4}>
              <tbody>
                <tr>
                  <td align="right">
                    <label htmlFor="wd-select-role">Role (select one):</label>
                  </td>
                  <td>
                    <select
                      id="wd-select-role"
                      name="role"
                      defaultValue="student"
                    >
                      <option value="student">Student</option>
                      <option value="ta">Teaching Assistant</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td align="right" valign="top">
                    <label htmlFor="wd-select-skills">
                      Skills (select many):
                    </label>
                  </td>
                  <td>
                    <select
                      id="wd-select-skills"
                      name="skills"
                      multiple
                      size={4}
                      defaultValue={["html", "css"]}
                    >
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="js">JavaScript</option>
                      <option value="react">React</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <div>
            <button type="submit">Submit</button>
            &nbsp;
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>

      <h5>Text boxes</h5>
      <label>Biography:</label>
      <br />
      <textarea
        defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.`}
        id="wd-textarea"
        cols={30}
        rows={10}
      ></textarea>
      <div id="wd-section-buttons" role="region" aria-labelledby="wd-buttons">
        <h5 id="wd-buttons">Buttons</h5>
        <button
          type="button"
          onClick={() => alert("Life is Good!")}
          id="wd-all-good"
        >
          Hello World!
        </button>
      </div>
      <hr />

      <div
        id="wd-section-radios"
        role="region"
        aria-labelledby="wd-radio-buttons"
      >
        <h5 id="wd-radio-buttons">Radio buttons</h5>

        <label>Favorite movie genre:</label>
        <br />

        <input type="radio" name="radio-genre" id="wd-radio-comedy" />
        <label htmlFor="wd-radio-comedy">Comedy</label>
        <br />

        <input type="radio" name="radio-genre" id="wd-radio-drama" />
        <label htmlFor="wd-radio-drama">Drama</label>
        <br />

        <input type="radio" name="radio-genre" id="wd-radio-scifi" />
        <label htmlFor="wd-radio-scifi">Science Fiction</label>
        <br />

        <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
        <label htmlFor="wd-radio-fantasy">Fantasy</label>
      </div>

      <hr />

      <div
        id="wd-section-checkboxes"
        role="region"
        aria-labelledby="wd-checkboxes"
      >
        <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre:</label>
        <br />

        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
        <label htmlFor="wd-chkbox-comedy">Comedy</label>
        <br />

        <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
        <label htmlFor="wd-chkbox-drama">Drama</label>
        <br />

        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
        <br />

        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      </div>

      <div
        id="wd-section-dropdowns"
        role="region"
        aria-labelledby="wd-dropdowns"
      >
        <h4 id="wd-dropdowns">Dropdowns</h4>

        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label>
        <br />
        <select id="wd-select-one-genre" defaultValue="SCIFI">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label>
        <br />
        <select
          id="wd-select-many-genre"
          multiple
          defaultValue={["COMEDY", "SCIFI"]}
        >
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>
      </div>

      <h4>Other HTML field types</h4>

      <label htmlFor="wd-text-fields-email"> Email: </label>
      <input
        type="email"
        placeholder="jdoe@somewhere.com"
        id="wd-text-fields-email"
      />
      <br />

      <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
      <input
        type="number"
        id="wd-text-fields-salary-start"
        placeholder="1000"
        defaultValue={100000}
      />
      <br />

      <label htmlFor="wd-text-fields-rating"> Rating: </label>
      <input type="range" id="wd-text-fields-rating" max={5} defaultValue={4} />
      <br />

      <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
      <input type="date" id="wd-text-fields-dob" defaultValue="2000-01-21" />
      <br />

      <div
        id="wd-section-anchors"
        role="region"
        aria-labelledby="wd-anchor-heading"
      >
        <h4 id="wd-anchor-heading">Anchor tag</h4>

        <p>
          Please{" "}
          <a
            href="https://rohitportfolio-v1.vercel.app/"
            id="wd-lipsum"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>{" "}
          to get my Portfolio.
        </p>

        <p>
          View my code repository on GitHub:{" "}
          <a
            id="wd-github"
            href="https://github.com/Rohitbiradar12/Kambuz_Labs.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            kambaz-labs (GitHub)
          </a>
        </p>
        <div id="wd-kambaz-link">
          <h4>Back to Kambaz</h4>
          <ul>
            <li>
              <a href="/Dashboard">Open Kambaz Dashboard</a>
            </li>
            <li>
              <a href="/Account/Signin">Go to Kambaz Signin</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
