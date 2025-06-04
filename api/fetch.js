async function fetchGithubUser() {
  const usernameInput = document.getElementById("search");
  const username = usernameInput.value.trim();

  if (!username) {
    alert("Please enter username");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      document.getElementById("error").classList.remove("hidden");
      document.getElementById("div-card").classList.add("hidden");
      return;
    }

    const data = await response.json();
    console.log(data);

    document.getElementById("div-card").classList.remove("hidden");
    document.getElementById("error").classList.add("hidden");

    // Personal Info //
    document.getElementById("avatar").src = data.avatar_url || "No Avatar";
    document.getElementById("name").textContent = data.login || "No name";
    document.getElementById("username").textContent =
      data.name || "No usernmae";
    document.getElementById("bio").textContent = data.bio || "No bio";
    document.getElementById("joined").textContent = `Joined: ${new Date(
      data.created_at
    ).getFullYear()}`;

    // Total Count of Repositories, Following, Folllowers //
    document.getElementById("repos").textContent = data.public_repos || "0";
    document.getElementById("following").textContent = data.following || "0";
    document.getElementById("followers").textContent = data.followers || "0";

    // External Links //
    document.getElementById("github-link").href = data.html_url;
    document.getElementById("github-link").textContent = "GitHub";

    document.getElementById("blog-link").href = data.blog || "#";
    document.getElementById("blog-link").textContent = data.blog
      ? "Blog"
      : "No blog";

    document.getElementById("email-link").href = "#";
    document.getElementById("email-link").textContent =
      data.email || "No Email";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
