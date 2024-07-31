const template = document.createElement('template');
template.innerHTML = `
<style>
  .user-card {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 0.625rem;
    margin-bottom: 0.938rem;
    border-bottom: darkorchid 0.313rem solid;
  }
  .user-card img{
    width: 100%;
  }
  .user-card button{
    cursor: pointer;
    background: darkorchid;
    color: #fff;
    border: 0;
    border-radius: 0.313rem;
    paddding:  0.313rem  0.625rem;
  }
 h3 {
  color: coral;
 }
</style>
<div class="user-card">
  <img />
  <div>
    <h3></h3>
    <div class="info">
      <p><slot name="email"/></p>
      <p><slot name="phone"/></p>
    </div>
    <button id="toggle-info">Hide info</button>
  </div>
</div>
`;
class UserCard extends HTMLElement {
  constructor() {
    super(),
      (this.showInfo = !0),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(template.content.cloneNode(!0)),
      (this.shadowRoot.querySelector('.user-card > div > h3').innerText = this.getAttribute('display-name')),
      (this.shadowRoot.querySelector('.user-card > img').src = this.getAttribute('avatar'));
  }
  toggleInfo() {
    this.showInfo = !this.showInfo;
    let e = this.shadowRoot.querySelector('.user-card .info'),
      o = this.shadowRoot.querySelector('#toggle-info');
    this.showInfo ? ((e.style.display = 'block'), (o.innerText = 'Hide info')) : ((e.style.display = 'none'), (o.innerText = 'Show info'));
  }
  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener('click');
  }
}
window.customElements.define('user-card', UserCard);
