(async function bootstrapAdmin() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("admin-warning").textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      document.getElementById("admin-warning").textContent =
        "The client says this is not your area, but the page still tries to load admin data.";
    } else {
      document.getElementById("admin-warning").textContent = "Authenticated as admin.";
    }

    const result = await api("/api/admin/users");
    const adminUsers = document.getElementById("admin-users");

const rows = result.users.map((entry) => {
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.textContent = entry.id;

  const usernameTd = document.createElement("td");
  usernameTd.textContent = entry.username;

  const roleTd = document.createElement("td");
  roleTd.textContent = entry.role;

  const displayNameTd = document.createElement("td");
  displayNameTd.textContent = entry.displayName;

  const noteCountTd = document.createElement("td");
  noteCountTd.textContent = entry.noteCount;

  tr.append(idTd, usernameTd, roleTd, displayNameTd, noteCountTd);

  return tr;
});

adminUsers.replaceChildren(...rows);
  } catch (error) {
    document.getElementById("admin-warning").textContent = error.message;
  }
})();
