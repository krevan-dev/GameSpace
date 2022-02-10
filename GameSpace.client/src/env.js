export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-hgqjrro9.us.auth0.com'
export const clientId = 'JrqqXscucubFtUlHT7GxKeNrn0rvmBXv'
export const audience = 'https://gregslist.com'


export const firebaseConfig = {
  apiKey: "AIzaSyD0cueFOFHxAgrJ0Qk7jx0kBn4nMdgvC9k",
  authDomain: "gamespace-5e220.firebaseapp.com",
  projectId: "gamespace-5e220",
  storageBucket: "gamespace-5e220.appspot.com",
  messagingSenderId: "304411184638",
  appId: "1:304411184638:web:e79382659f4c7678b384af",
  measurementId: "G-PZ88VNR84V"
};