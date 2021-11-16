const linksSocialMedia = {
  github: "LeonardoFuba",
  youtube: "channel/UCxHYgBzJ17PgQxazdT4f_qA",
  instagram: "fuba3822",
  facebook: "fuba3822",
  twitter: "leonardo3822",
}

function changeSocialMediaLinks(){
  for (let li of socialLinks.children) {
    const social = li.getAttribute("class")          
    li.children[0].href = `https://${social}.com/${linksSocialMedia[social]}`
  }
}

function getGithubProfileInfos(){
  const url = `https://api.github.com/users/${linksSocialMedia.github}`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      userImage.src = data.avatar_url
      userName.textContent = data.name
      userLink.href = data.html_url
      userLogin.textContent = data.login
      userBio.textContent = data.bio
    })

}

getGithubProfileInfos()
changeSocialMediaLinks()
