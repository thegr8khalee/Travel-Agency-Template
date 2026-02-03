# Travel Agency Website Prototype Plan

## Project Overview
**Goal:** Build a frontend-only React prototype for a travel agency website.
**Inspiration:** [Wakanow.com](https://www.wakanow.com)
**Stack:** React (Vite), CSS/Tailwind (TBD), React Router for navigation.
**Data Strategy:** Use static mock data (JSON/Arrays) to simulate search results and listings.

---

## 1. Architecture & Setup
- [ ] Initialize React project (Already done).
- [ ] Install **React Router** for navigation between pages.
- [ ] Set up folder structure:
  - `/components`: Reusable UI parts (Navbar, Footer, Cards).
  - `/pages`: Individual page views.
  - `/data`: Mock data files (flights.js, hotels.js, etc.).
  - `/assets`: Images and icons.

## 2. Shared Components
- **Navbar**: Logo, Navigation Links, "Manage Booking", "Login/Sign Up".
- **Footer**: Company links, Contact info, Social media, Newsletter.
- **HeroWithSearch**: Configurable Hero section with tabbed search box (Flights, Hotels, etc.).
- **ServiceCard**: Generic card for displaying services/packages.
- **SectionHeader**: Reusable headers for page sections.
- **Buttons**: Primary CTA, Secondary buttons.

## 3. Mock Data Structure
- `flightsData`: Array of flight objects (airline, price, duration, stops).
- `hotelsData`: Array of hotel objects (name, rating, price, image).
- `visaCountries`: List of countries and requirements.
- `studyPackages`: Universities/Countries and package details.
- `holidayPackages`: Destination, duration, price, inclusions.
- `hajjPackages`: Specific religious travel packages.

---

## 4. Page Implementation Plan

### 1️⃣ Landing Page (Home)
*Essential for first impressions. Heavily inspired by Wakanow.*
- **Hero Section**:
  - Headline: "Book Flights, Hotels, Visas & Tours — All in One Place".
  - **Interactive Search Tabs** (State switching):
    - ✈ Flights | 🏨 Hotels | 🧳 Holidays | 🎓 Study Abroad | 🕋 Hajj & Umrah
- **Why Choose Us**: Icons + Text (Trusted, 24/7 Support, Best Prices, Experts).
- **Services Overview**: Grid of cards linking to respective pages.
- **Popular Destinations**: Carousel or Grid of top locations (Dubai, UK, Turkey, Saudi).
- **CTA Section**: "Talk to a Travel Expert" button.

### 2️⃣ Flights Page
*Simulation of flight search.*
- **Search Panel**: Inputs for Origin, Destination, Dates, Passengers, Class.
- **Results List** (Rendered from mock data on "Search" click):
  - Airline Logo, Time, Duration, Price.
  - "Book Now" button (Simulates booking flow).

### 3️⃣ Hotel Reservations
- **Search Panel**: City, Check-in/out, Guests.
- **Hotel Grid**:
  - Image, Name, Star Rating, Price/night.
  - "Reserve" button.

### 4️⃣ Visa Assistance Page
*Trust-building page.*
- **Country Selector**: Tabs or Cards for UK, USA, Schengen, Canada, Turkey.
- **Service Details**: Documentation, Appointments, Review.
- **CTA**: "Start Visa Application" (Opens modal or scrolls to form).
- **Simple Form**: Name, Email, Country, Purpose.

### 5️⃣ Study Abroad Packages
- **Destinations List**: UK, Canada, Turkey, Germany.
- **Services List**: Admission, Visa, Accommodation.
- **CTA**: "Speak to an Advisor".

### 6️⃣ Holiday & Tour Packages
- **Layout**: Grid (Wakanow style).
- **Card**: Destination Image, Duration, Price, "Inclusions" summary.
- **Interaction**: Clicking "View Details" shows full itinerary (Mock mock-up).

### 7️⃣ Hajj & Umrah
- **Tabs**: Umrah Packages vs. Hajj Packages.
- **Package Cards**: Dates, Inclusions (Hotel/Flight), Price.
- **CTA**: "Register Interest".

### 8️⃣ Corporate Travel Solutions
- **Informational Content**: Flight/Hotel management, Account Manager, Invoicing.
- **CTA**: "Request Corporate Quote" (Link to email or specific form).

### 9️⃣ Contact / Consultation
- **Contact Details**: Phone, Email, Office Address.
- **WhatsApp Button**: Direct link simulation.
- **Contact Form**: General inquiries.

---

## 5. Development Phases
1.  **Skeleton**: Set up Routes and empty Page components.
2.  **Layout**: Build Navbar and Footer.
3.  **Home Page**: Implement the complex Hero and Search Tabs.
4.  **Listing Pages**: Build generic "List Layout" for Flights, Hotels, Packages.
5.  **Forms**: Create the Contact and Booking simulation forms.
6.  **Styling**: Apply "Wakanow-inspired" theme (likely Blue/Orange/White color scheme).
