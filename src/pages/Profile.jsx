import { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Ghost Gajjar',
    email: 'Gajjarghost@gmail.com',
    address: 'Parshwanath Township, Krishnanagar, Ahmedabad',
    phone: '+91-9099406928',
    profileImage: 'Ghost_pic.jpg' // Add a state for the profile image
  });
  
  const [editMode, setEditMode] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    setEditMode(false);
    // In a real app, you would save to an API here
  };
  
  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      
      <div className="profile-card">
        {editMode ? (
          <form>
            <div className="form-group">
              <label>Profile Image:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              {user.profileImage && (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="profile-image"
                />
              )}
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={user.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={user.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input 
                type="text" 
                name="address" 
                value={user.address} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input 
                type="tel" 
                name="phone" 
                value={user.phone} 
                onChange={handleInputChange} 
              />
            </div>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </form>
        ) : (
          <>
            {user.profileImage && (
              <img src={user.profileImage} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            )}
            <div className="profile-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            <button 
              className="edit-btn" 
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
      
      <div className="order-history">
        <h2>Order History</h2>
        <p>You haven't placed any orders yet.</p>
        {/* In a real app, you would map through order history here */}
      </div>
    </div>
  );
};

export default Profile;