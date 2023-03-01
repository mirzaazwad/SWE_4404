import '../index.css'; // import the CSS file for styling

function ProfilePicture() {
  return (
    <div className="profile-picture-container">
      <img src={require('../test.jpg')} alt="Profile Picture" />
      <a href="#" className="edit-profile-picture"><i className="bx bx-pencil"></i></a>
    </div>
  );
}

export default ProfilePicture;

