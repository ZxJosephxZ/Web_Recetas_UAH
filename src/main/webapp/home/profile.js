// profile.js — load/save profile to localStorage and handle photo upload
(function(){
  const redirectToLogin = () => { window.location.href = "../login.html"; };

  let user = JSON.parse(localStorage.getItem('user')) || null;
  if (!user) {
    // not logged in -> go to login
    redirectToLogin();
    return;
  }

  // Elements
  const photoInput = document.getElementById('photoInput');
  const photoPreview = document.getElementById('photoPreview');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const bioInput = document.getElementById('bio');
  const passwordInput = document.getElementById('password');
  const saveBtn = document.getElementById('saveProfile');
  const cancelBtn = document.getElementById('cancelProfile');
  const gallery = document.getElementById('gallery');
  const profileView = document.getElementById('profileView');
  const profileForm = document.getElementById('profileForm');
  const editToggle = document.getElementById('editToggle');
  const viewName = document.getElementById('viewName');
  const viewEmail = document.getElementById('viewEmail');
  const viewBio = document.getElementById('viewBio');
  const profileMsg = document.getElementById('profileMsg');

  const splitName = (u) => {
    if (u.firstName || u.lastName) return { firstName: u.firstName || '', lastName: u.lastName || '' };
    if (u.name) {
      const parts = u.name.split(' ');
      return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '' };
    }
    return { firstName: '', lastName: '' };
  };

  let originalEmail = user.email || '';

  const names = splitName(user);
  firstNameInput.value = names.firstName;
  lastNameInput.value = names.lastName;
  emailInput.value = user.email || '';
  bioInput.value = user.bio || '';
  passwordInput.value = '';

  if (user.photo) {
    photoPreview.src = user.photo;
  }

  const refreshView = () => {
    const n = splitName(user);
    viewName.textContent = (n.firstName + (n.lastName ? ' ' + n.lastName : '')).trim() || 'Sin nombre';
    viewEmail.textContent = user.email || '';
    viewBio.textContent = user.bio || 'Editar tu perfil para añadir una pequeña descripción.';
    if (user.photo) photoPreview.src = user.photo;
  };

  const samplePhotos = [
    '../../../img/plato1.png',
    '../../../img/mojito.png',
    '../../../img/brownie.png',
    '../../../img/plato3.png'
  ];

  const renderGallery = () => {
    if (!gallery) return;
    gallery.innerHTML = '';
    const userPhotos = user.photos || [];
    const photos = [...userPhotos, ...samplePhotos];
    photos.forEach(src => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      el.appendChild(img);
      gallery.appendChild(el);
    });
  };

  renderGallery();
  refreshView();

  // Toggle edit/view
  const openEdit = () => {
    if (profileView && profileView.style) profileView.style.display = 'none';
    if (profileForm && profileForm.style) profileForm.style.display = 'block';
    const n = splitName(user);
    firstNameInput.value = n.firstName;
    lastNameInput.value = n.lastName;
    emailInput.value = user.email || '';
    passwordInput.value = '';
    bioInput.value = user.bio || '';
  };
  const closeEdit = () => {
    if (profileForm && profileForm.style) profileForm.style.display = 'none';
    if (profileView && profileView.style) profileView.style.display = 'block';
    if (photoPreview && photoPreview.dataset) delete photoPreview.dataset.newPhoto;
  };


  if (editToggle) editToggle.addEventListener('click', openEdit);

  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        photoPreview.src = ev.target.result;
        photoPreview.dataset.newPhoto = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (saveBtn) saveBtn.addEventListener('click', () => {
    const f = firstNameInput.value.trim();
    const l = lastNameInput.value.trim();
    const newEmail = (emailInput.value || '').trim();
    const newPassword = (passwordInput.value || '').trim();
    const newBio = (bioInput.value || '').trim();

    // Clear previous messages
    if (profileMsg) profileMsg.textContent = '';

    // Validate duplicate email: if newEmail is used by another account (not the current one)
    try {
      const accountsCheck = JSON.parse(localStorage.getItem('accounts')) || [];
      const duplicate = newEmail && newEmail !== originalEmail && accountsCheck.some(a => a.email === newEmail);
      if (duplicate) {
        if (profileMsg) {
          profileMsg.textContent = 'Ese correo ya está en uso por otra cuenta.';
        } else {
          alert('Ese correo ya está en uso por otra cuenta.');
        }
        return; 
      }
    } catch (e) {
    }

    // update user object
    user.firstName = f;
    user.lastName = l;
    user.name = (f + (l ? ' ' + l : '')).trim();

    if (photoPreview.dataset && photoPreview.dataset.newPhoto) {
      user.photo = photoPreview.dataset.newPhoto;
      delete photoPreview.dataset.newPhoto;
    }

    // update email/password if provided
    if (newEmail) {
      user.email = newEmail;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    user.bio = newBio;

    localStorage.setItem('user', JSON.stringify(user));

    try {
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
      const idx = accounts.findIndex(a => a.email === originalEmail);

      const stripLargeImages = (obj) => {
        const copy = Object.assign({}, obj);
        if (copy.photo) delete copy.photo;
        if (copy.photos) delete copy.photos;
        return copy;
      };

      if (idx >= 0) {
        accounts[idx] = Object.assign({}, accounts[idx], stripLargeImages(user));
      } else {
        const idx2 = accounts.findIndex(a => a.email === user.email);
        if (idx2 >= 0) {
          accounts[idx2] = Object.assign({}, accounts[idx2], stripLargeImages(user));
        } else {
          accounts.push(stripLargeImages(user));
        }
      }

      try {
        localStorage.setItem('accounts', JSON.stringify(accounts));
      } catch (saveErr) {
        console.warn('Failed to save accounts to localStorage (quota?). Attempting to strip any remaining image data and retry.', saveErr);
        const cleaned = accounts.map(a => {
          const c = Object.assign({}, a);
          if (c.photo) delete c.photo;
          if (c.photos) delete c.photos;
          return c;
        });
        try {
          localStorage.setItem('accounts', JSON.stringify(cleaned));
        } catch (finalErr) {
          console.warn('Failed to persist accounts after cleaning images:', finalErr);
        }
      }

      originalEmail = user.email || originalEmail;
    } catch (err) {
      console.warn('No accounts to update', err);
    }

    saveBtn.textContent = 'Guardado ✓';
    setTimeout(() => saveBtn.textContent = 'Guardar', 1200);

    refreshView();
    renderGallery();
    closeEdit();
  });

  if (cancelBtn) cancelBtn.addEventListener('click', () => {
    const n = splitName(user);
    firstNameInput.value = n.firstName;
    lastNameInput.value = n.lastName;
    emailInput.value = user.email || '';
    if (user.photo) photoPreview.src = user.photo;
    passwordInput.value = '';
    if (profileMsg) profileMsg.textContent = '';
    closeEdit();
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.href = '../index.html';
    });
  }

})();
