import React, { useState } from 'react';
import { ShoppingCart, X, AlertCircle, CheckCircle } from 'lucide-react';

const FriendlyPawsWebsite = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSection, setCurrentSection] = useState('home');
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    duration: '1',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    petName: '',
    petType: '',
    notes: '',
    agreeTerms: false
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 35,
      description: 'Soft, natural tones. Small left chest logo.',
      colors: ['Sand', 'Sage Green'],
      image: '👕'
    },
    {
      id: 2,
      name: 'Cozy Sweatshirt',
      price: 52,
      description: 'Center front design. Warm, earthy colors.',
      colors: ['Sage Green', 'Terracotta'],
      image: '🧥'
    },
    {
      id: 3,
      name: 'Premium Hoodie',
      price: 65,
      description: 'Premium comfort fit. Made for animal lovers.',
      colors: ['Sand', 'Sage Green'],
      image: '🎽'
    }
  ];

  const services = [
    {
      id: 'dog-walking',
      icon: '🐕',
      title: 'Dog Walking',
      description: 'More than just steps — quality time in motion. Mindful walks tailored to your dog\'s personality and energy level.',
      price: 30,
      duration: '45 mins',
      fullDescription: 'Professional dog walking service providing mental stimulation, exercise, and social interaction for your furry friend.'
    },
    {
      id: 'pet-sitting',
      icon: '🏠',
      title: 'Pet Sitting',
      description: 'In-home care where your pets stay comfortable and loved. No stress, no kennels, just attentive care.',
      price: 25,
      duration: 'per visit',
      fullDescription: 'In-home pet care including feeding, exercise, playtime, and companionship while you\'re away.'
    },
    {
      id: 'cat-care',
      icon: '🐈',
      title: 'Cat Care',
      description: 'Calm, patient, respectful care for your feline friends. Your cat stays in their familiar environment.',
      price: 20,
      duration: 'per visit',
      fullDescription: 'Specialized cat care with gentle handling, feeding, litter maintenance, and calm interaction.'
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');

    if (!bookingData.service || !bookingData.date || !bookingData.time || !bookingData.customerName || !bookingData.customerEmail || !bookingData.petName || !bookingData.agreeTerms) {
      setBookingError('Please fill in all required fields');
      return;
    }

    setProcessingPayment(true);

    try {
      const bookingPayload = {
        ...bookingData,
        bookingId: `FPAWS-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      console.log('Booking data:', bookingPayload);

      setBookingSubmitted(true);
      setBookingData({
        service: '',
        date: '',
        time: '',
        duration: '1',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        petName: '',
        petType: '',
        notes: '',
        agreeTerms: false
      });

      setTimeout(() => {
        setBookingSubmitted(false);
      }, 5000);
    } catch (error) {
      setBookingError('Error processing booking. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const selectedService = services.find(s => s.id === bookingData.service);
  const bookingPrice = selectedService ? selectedService.price * parseInt(bookingData.duration || 1) : 0;

  const navigateTo = (section) => {
    setCurrentSection(section);
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F5', fontFamily: '"Anthropic Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#2D2D2D' }}>
      
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #E5DFD5', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={() => navigateTo('home')} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '20px', color: '#6B9E7F', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🐾 Friendly Paws
          </div>

          <nav style={{ display: 'flex', gap: '32px', fontSize: '14px', alignItems: 'center' }}>
            {['Home', 'Book Service', 'Shop', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item === 'Book Service' ? 'booking' : item.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: currentSection === item.toLowerCase() || (item === 'Book Service' && currentSection === 'booking') ? '#6B9E7F' : '#2D2D2D',
                  fontWeight: currentSection === item.toLowerCase() || (item === 'Book Service' && currentSection === 'booking') ? 600 : 400,
                  padding: '8px 0',
                  borderBottom: currentSection === item.toLowerCase() || (item === 'Book Service' && currentSection === 'booking') ? '2px solid #6B9E7F' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setCartOpen(!cartOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ShoppingCart size={24} color="#6B9E7F" />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#C9745D',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {cartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #E5DFD5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Shopping Cart</h2>
            <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <p style={{ color: '#8B7F77', textAlign: 'center', paddingTop: '40px' }}>Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{
                  padding: '16px',
                  backgroundColor: '#F5F2EB',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{item.name}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#C9745D',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#8B7F77' }}>
                    <span>CHF {item.price}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: '#E5DFD5',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        −
                      </button>
                      <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: '#6B9E7F',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '24px', borderTop: '1px solid #E5DFD5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>CHF {cartTotal.toFixed(2)}</span>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#6B9E7F',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '12px'
              }}>
                Checkout with Stripe
              </button>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#6B9E7F',
                  border: '1px solid #E5DFD5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      )}

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {currentSection === 'home' && (
          <>
            <section style={{
              padding: '80px 24px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #F5F2EB 0%, #FAF8F5 100%)',
              borderBottom: '1px solid #E5DFD5'
            }}>
              <h1 style={{ fontSize: '48px', fontWeight: 600, marginBottom: '16px', color: '#2D2D2D' }}>
                Pet Care With Heart
              </h1>
              <p style={{ fontSize: '18px', color: '#8B7F77', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                Professional, compassionate care for your beloved dogs and cats. Book directly and pay securely online.
              </p>
              <button
                onClick={() => navigateTo('booking')}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#6B9E7F',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginRight: '12px'
                }}
              >
                Book a Service
              </button>
              <button
                onClick={() => navigateTo('shop')}
                style={{
                  padding: '12px 32px',
                  backgroundColor: 'transparent',
                  color: '#6B9E7F',
                  border: '2px solid #6B9E7F',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Shop Merchandise
              </button>
            </section>

            <section style={{ padding: '60px 24px' }}>
              <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 600, marginBottom: '12px' }}>Our Services</h2>
              <p style={{ textAlign: 'center', color: '#8B7F77', marginBottom: '48px' }}>
                Book directly online and pay securely
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {services.map((service, idx) => (
                  <div key={idx} style={{
                    padding: '32px 24px',
                    backgroundColor: '#F5F2EB',
                    borderRadius: '12px',
                    border: '0.5px solid #D4C4B8',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{service.icon}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{service.title}</h3>
                    <p style={{ fontSize: '14px', color: '#8B7F77', marginBottom: '12px', lineHeight: '1.6' }}>{service.description}</p>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#6B9E7F', marginBottom: '8px' }}>CHF {service.price}</p>
                    <p style={{ fontSize: '12px', color: '#A89968' }}>{service.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentSection === 'booking' && (
          <section style={{ padding: '60px 24px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '48px', textAlign: 'center' }}>Book a Service</h1>

            {bookingSubmitted && (
              <div style={{
                padding: '20px',
                backgroundColor: '#E2EFDA',
                border: '1px solid #6B9E7F',
                borderRadius: '8px',
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <CheckCircle size={24} color="#6B9E7F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#6B9E7F', fontWeight: 600 }}>Booking Confirmed!</h3>
                  <p style={{ margin: 0, color: '#6B9E7F', fontSize: '14px' }}>
                    We've sent a confirmation and invoice to your email. You'll receive a notification once we process your payment. Thank you for choosing Friendly Paws!
                  </p>
                </div>
              </div>
            )}

            {bookingError && (
              <div style={{
                padding: '20px',
                backgroundColor: '#FCE4D6',
                border: '1px solid #C9745D',
                borderRadius: '8px',
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <AlertCircle size={24} color="#C9745D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#C9745D', fontWeight: 600 }}>Error</h3>
                  <p style={{ margin: 0, color: '#C9745D', fontSize: '14px' }}>{bookingError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} style={{
              backgroundColor: 'white',
              border: '1px solid #E5DFD5',
              borderRadius: '12px',
              padding: '32px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Select Service *
                </label>
                <select
                  name="service"
                  value={bookingData.service}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title} - CHF {service.price} ({service.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Duration (hours) *
                </label>
                <select
                  name="duration"
                  value={bookingData.duration}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="4">4 Hours</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={bookingData.customerName}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={bookingData.customerEmail}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={bookingData.customerPhone}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={bookingData.petName}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Pet Type *
                </label>
                <select
                  name="petType"
                  value={bookingData.petType}
                  onChange={handleBookingChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select pet type...</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                  Special Notes or Requirements
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleBookingChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5DFD5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                  placeholder="Tell us about your pet's personality, any special care needs, etc."
                />
              </div>

              <div style={{ gridColumn: '1 / -1', backgroundColor: '#F5F2EB', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Service Price:</span>
                  <span>CHF {bookingPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '16px', borderTop: '1px solid #D4C4B8', paddingTop: '8px' }}>
                  <span>Total:</span>
                  <span style={{ color: '#6B9E7F' }}>CHF {bookingPrice.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={bookingData.agreeTerms}
                  onChange={handleBookingChange}
                  required
                  style={{ marginTop: '4px', cursor: 'pointer' }}
                />
                <label style={{ fontSize: '13px', color: '#8B7F77', cursor: 'pointer' }}>
                  I agree to the terms and conditions and understand I will receive an invoice and confirmation email after booking.
                </label>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  disabled={processingPayment}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: processingPayment ? '#A89968' : '#6B9E7F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: processingPayment ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {processingPayment ? 'Processing...' : 'Complete Booking & Pay (Stripe)'}
                </button>
              </div>
            </form>

            <div style={{ marginTop: '48px', padding: '24px', backgroundColor: '#F5F2EB', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ marginTop: 0 }}>Secure Payment & Instant Confirmation</h3>
              <p style={{ color: '#8B7F77', fontSize: '14px', margin: 0 }}>
                Your booking will be instantly confirmed. You'll receive an invoice via email, and we'll send you a notification to confirm the service date. Payment is processed securely via Stripe.
              </p>
            </div>
          </section>
        )}

        {currentSection === 'shop' && (
          <section style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>Merchandise</h1>
            <p style={{ textAlign: 'center', color: '#8B7F77', marginBottom: '48px' }}>
              Support pet care with style
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {products.map(product => (
                <div key={product.id} style={{
                  backgroundColor: 'white',
                  border: '0.5px solid #E5DFD5',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#E8DDD4',
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '72px'
                  }}>
                    {product.image}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{product.name}</h3>
                    <p style={{ fontSize: '13px', color: '#8B7F77', marginBottom: '12px' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontWeight: 600, color: '#6B9E7F', fontSize: '16px' }}>CHF {product.price}</span>
                      <div style={{ fontSize: '12px', color: '#8B7F77' }}>
                        {product.colors.join(', ')}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#6B9E7F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentSection === 'about' && (
          <section style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '32px', textAlign: 'center' }}>About Friendly Paws</h1>
            <div style={{ color: '#8B7F77', lineHeight: '1.8', fontSize: '16px' }}>
              <p style={{ marginBottom: '24px' }}>
                Friendly Paws was founded on a simple belief: every pet deserves care that feels like home. Our founder, with a PhD in Biochemistry, discovered that her passion for animals could be transformed into a meaningful career providing professional pet care services.
              </p>
              <p style={{ marginBottom: '24px' }}>
                What started as a desire for independence and personal fulfillment has become a mission to provide pets and their owners with the highest standard of care. The scientific approach combined with genuine compassion creates a unique model where every interaction is thoughtful, stress-free, and filled with genuine affection.
              </p>
              <p style={{ marginBottom: '24px' }}>
                <strong>Our Philosophy:</strong> Pets aren't just animals to care for—they're family members. That's why we treat them with the time, attention, and love they truly deserve. We believe in a relaxed approach that reduces stress for both pet and owner.
              </p>
              <p>
                <strong>Our Promise:</strong> Professional excellence, genuine compassion, and a commitment to making every pet feel valued and loved.
              </p>
            </div>
          </section>
        )}

        {currentSection === 'contact' && (
          <section style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '48px', textAlign: 'center' }}>Get In Touch</h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              marginBottom: '48px'
            }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Contact Information</h3>
                <p style={{ color: '#8B7F77', marginBottom: '12px' }}>
                  <strong>Email:</strong><br/>
                  hello@friendlypaws.ch
                </p>
                <p style={{ color: '#8B7F77', marginBottom: '12px' }}>
                  <strong>Phone:</strong><br/>
                  +41 XX XXX XXXX
                </p>
                <p style={{ color: '#8B7F77' }}>
                  <strong>Location:</strong><br/>
                  Brugg, Switzerland<br/>
                  15 km radius service area
                </p>
              </div>
              <div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{
                      padding: '12px',
                      border: '1px solid #E5DFD5',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={{
                      padding: '12px',
                      border: '1px solid #E5DFD5',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    style={{
                      padding: '12px',
                      border: '1px solid #E5DFD5',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  />
                  <button
                    style={{
                      padding: '12px',
                      backgroundColor: '#6B9E7F',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer style={{
        backgroundColor: '#F5F2EB',
        borderTop: '1px solid #E5DFD5',
        padding: '48px 24px',
        textAlign: 'center',
        color: '#8B7F77',
        fontSize: '13px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#2D2D2D' }}>Friendly Paws</strong><br/>
            Pet Care Services<br/>
            Brugg, Switzerland
          </div>
          <div style={{ marginBottom: '20px' }}>
            📧 hello@friendlypaws.ch<br/>
            📱 +41 XX XXX XXXX
          </div>
          <div>© 2024 Friendly Paws. All paws reserved. 🐾</div>
        </div>
      </footer>
    </div>
  );
};

export default FriendlyPawsWebsite;
