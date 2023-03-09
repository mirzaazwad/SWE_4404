import '../../index.css'; // import the CSS file for styling

function ProfilePicture() {
  return (
    <div className="profile-picture-container">
      <img src={require('../../images/321504286_673183284310305_2418389886188844738_n.jpg')} alt="Profile Picture" />
      <a href="#" className="edit-profile-picture">Edit</a>
    </div>
  );
}

export default ProfilePicture;

