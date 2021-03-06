export default class Data {
  // * Fetches the REST API using users credentials when necessary

  api(path, method, body = null, requiresAuth = false, credentials = null) {
    const url = "http://localhost:5000/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // * Gets a user by their @param username(here, emailAddress) and @param password
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // Creates a new user with an object user and its properties (see signup.js)
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Gets all courses on the database

  async getCourses() {
    const response = await this.api("/courses", "GET", null, false);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  // Gets selected courses by @param id

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null, false);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  // Creates a new course with an object course, and authenticated user credentials

  async createCourse(course, username, password) {
    const response = await this.api("/courses", "POST", course, true, {
      username,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Updates the selected course by id, using as @params the course id, the course object and users credentials

  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // * Deletes selected course by id
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
