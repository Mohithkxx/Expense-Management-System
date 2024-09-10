import React from 'react'
import { Link } from 'react-router-dom'
import images from '../assets/herobanner.webp'

function Navber() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand text-capitalize" to={"/"}>Expense Management system</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={"/"}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={"/about"}>About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={"/register"}>Sign</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navber