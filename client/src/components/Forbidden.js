import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Forbidden() {
  return (
    <div id="root">
      <main>
        <div class="wrap">
          <h2>Forbidden</h2>
          <p>Oh oh! You can't access this page.</p>
        </div>
      </main>
    </div>
  );
}

export default Forbidden;
