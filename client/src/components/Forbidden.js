import React from "react";

// Component for pages that should not be access by non-authorises users
function Forbidden() {
  return (
    <div id="root">
      <main>
        <div className="wrap">
          <h2>Forbidden</h2>
          <p>Oh oh! You can't access this page.</p>
        </div>
      </main>
    </div>
  );
}

export default Forbidden;
