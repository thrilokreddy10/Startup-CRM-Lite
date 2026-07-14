async function test() {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bontha Thrilok Nath Reddy',
      email: 'bonthathrilokreddy@gmail.com',
      password: 'Thrilok'
    })
  });
  const data = await res.json();
  console.log(res.status);
  console.log(data);
}

test();
