const About = () => {
    return (
      <div className="about-page">
        <h1>About ShopEase</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, ShopEase began as a small startup with a big vision: to make online 
            shopping effortless and enjoyable for everyone. What started as a passion project 
            has grown into a trusted e-commerce platform serving thousands of customers worldwide.
          </p>
        </section>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At ShopEase, we're committed to providing high-quality products at competitive prices, 
            delivered with exceptional customer service. We carefully curate our product selection 
            to ensure we offer items that meet our standards for quality, durability, and value.
          </p>
        </section>
        
        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-members" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div className="team-member" style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Alex Johnson"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>Alex Johnson</h3>
              <p style={{ color: '#666' }}>Founder & CEO</p>
            </div>
            <div className="team-member" style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Sarah Williams"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>Sarah Williams</h3>
              <p style={{ color: '#666' }}>Head of Operations</p>
            </div>
            <div className="team-member" style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Michael Chen"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>Michael Chen</h3>
              <p style={{ color: '#666' }}>Lead Developer</p>
            </div>
          </div>
        </section>
        
        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Customer First:</strong> Your satisfaction is our top priority.</li>
            <li><strong>Quality Assurance:</strong> We stand behind every product we sell.</li>
            <li><strong>Transparency:</strong> Honest pricing and clear policies.</li>
            <li><strong>Innovation:</strong> Constantly improving your shopping experience.</li>
          </ul>
        </section>
      </div>
    );
  };
  
  export default About;