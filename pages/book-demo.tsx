import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/Layout'
import GrowRippleLogo from '../Images/GrowRipple_logo_with_bg-removebg-preview.png'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, setHours, setMinutes } from 'date-fns'

interface TimeSlot {
  time: string
  value: Date
}

export default function BookDemoPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    company: '',
    businessType: '',
    readiness: '',
    message: ''
  })

  // Available time slots (9 AM to 7 PM in 30-minute intervals)
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const startHour = 9
    const endHour = 19
    
    const formatTime = (hour: number, minute: number): string => {
      const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const period = hour >= 12 ? 'pm' : 'am'
      return `${h}:${minute.toString().padStart(2, '0')}${period}`
    }
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        time: formatTime(hour, 0),
        value: setMinutes(setHours(new Date(date), hour), 0)
      })
      if (hour < endHour - 1) {
        slots.push({
          time: formatTime(hour, 30),
          value: setMinutes(setHours(new Date(date), hour), 30)
        })
      }
    }
    return slots.filter(slot => {
      const now = new Date()
      return slot.value > now
    })
  }

  // Check if a date has available slots
  const hasAvailableSlots = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return generateTimeSlots(date).length > 0 && checkDate >= today
  }

  // Calendar setup
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const handleDateClick = (date: Date) => {
    if (isSameMonth(date, currentMonth) && hasAvailableSlots(date)) {
      setSelectedDate(date)
      setSelectedTime(null)
      setShowBookingForm(false)
    }
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    setShowBookingForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select a date and time')
      }

      const booking = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.workEmail,
        workEmail: formData.workEmail,
        phoneCountryCode: formData.phoneCountryCode,
        phoneNumber: formData.phoneNumber,
        company: formData.company,
        businessType: formData.businessType,
        message: formData.message,
        readiness: formData.readiness,
        date: selectedDate.toISOString(),
        time: selectedTime,
        timezone
      }

      // Call API to send email with Google Meet link
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book demo')
      }

      // Store booking in localStorage as backup
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      bookings.push({ ...booking, meetLink: data.meetLink, createdAt: new Date().toISOString() })
      localStorage.setItem('bookings', JSON.stringify(bookings))

      // Show success message
      setSubmitSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        workEmail: '',
        phoneCountryCode: '+1',
        phoneNumber: '',
        company: '',
        businessType: '',
        readiness: '',
        message: ''
      })
      setSelectedDate(null)
      setSelectedTime(null)
      setShowBookingForm(false)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error: any) {
      console.error('Booking error:', error)
      setSubmitError(error.message || 'Failed to book demo. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  // Get current time in selected timezone
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <>
      <Head>
        <title>Book a Demo | GrowRipple</title>
      </Head>
      <Layout hideHeader>
        <main className="min-h-screen bg-gradient-to-b from-[#e9fbff] via-white to-[#fff4e7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Section - Event Details */}
              <section className="order-2 lg:order-1">
                <div className="sticky top-8 rounded-[40px] border border-[#68d9f4] p-6 md:p-8 bg-gradient-to-b from-[#b8eaff] via-white to-[#fff7ef] backdrop-blur shadow-[0_40px_90px_-45px_rgba(9,178,209,0.6)] relative overflow-hidden">
                  <div className="absolute -top-16 right-4 h-56 w-56 rounded-full bg-[#5dcde4]/70 blur-[130px]" />
                  <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#ffe4d0]/60 blur-[180px]" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <Image
                        src={GrowRippleLogo}
                        alt="GrowRipple logo"
                        width={240}
                        height={90}
                        className="h-16 w-auto drop-shadow"
                      />
                      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#0aa5c8] bg-white/70 border border-white/60 px-4 py-1 rounded-full">
                        Live demo
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#0aa5c8] uppercase tracking-[0.25em] mb-4">
                      GrowRipple Platform Tour
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black text-[#071d32] leading-tight">
                      Launch AI-Matched Creator Campaigns
                    </h1>
                    <p className="text-[#556476] mt-4 leading-relaxed">
                      Meet RippleMatch™, RippleBriefs™, and RipplePulse™ in a 30-minute working session. See how GrowRipple pairs you with authentic creators, spins up briefs, and surfaces performance in real time.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-[#0a748a]">
                      <div className="rounded-3xl bg-white/80 border border-[#c3f4ff] p-4">
                        <p className="text-xs uppercase tracking-widest text-[#11b5c8]">Avg Response</p>
                        <p className="text-2xl font-bold text-[#082941]">‹12 hrs</p>
                      </div>
                      <div className="rounded-3xl bg-white/80 border border-[#c3f4ff] p-4">
                        <p className="text-xs uppercase tracking-widest text-[#11b5c8]">Time to launch</p>
                        <p className="text-2xl font-bold text-[#082941]">7–10 days</p>
                      </div>
                    </div>
                    <div className="mt-8 space-y-3">
                      {[
                        'AI-matched RippleMakers for your goal and market.',
                        'AI-built briefs that feel on-brand—no back-and-forth.',
                        'Campaign ops, contracts, payouts, and reporting in one orbit.'
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-[#4f6179]">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#00b9d9]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 rounded-[32px] bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] text-white px-6 py-5 shadow-lg">
                      <p className="text-sm uppercase tracking-[0.4em] opacity-80">Session includes</p>
                      <p className="text-base font-semibold mt-2">Custom walkthrough, campaign blueprint, and a recap deck within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right Section - Scheduling Interface */}
              <section className="order-1 lg:order-2">
                <div className="bg-white/95 backdrop-blur border border-[#12c8d5]/30 rounded-[32px] p-6 md:p-8 shadow-[0_30px_70px_-45px_rgba(0,166,201,0.6)]">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#071d32] mb-6">
                    Select a Date &amp; Time
                  </h2>

                  {/* Calendar + Time Slots Side-by-Side */}
                  <div className="mb-6 md:grid md:grid-cols-2 md:gap-6">
                    {/* Month Navigation (spans both on mobile, left on desktop) */}
                    <div className="flex items-center justify-between mb-4 md:col-span-2">
                      <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Previous month"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {format(currentMonth, 'MMMM yyyy')}
                      </h3>
                      <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Next month"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    {/* Calendar (left) */}
                    <div>
                      {/* Week Days Header */}
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {weekDays.map((day) => (
                          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day) => {
                          const isCurrentMonth = isSameMonth(day, currentMonth)
                          const isSelected = selectedDate && isSameDay(day, selectedDate)
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          const dayCopy = new Date(day)
                          dayCopy.setHours(0, 0, 0, 0)
                          const isPastDate = dayCopy < today
                          const isAvailable = hasAvailableSlots(day)

                          return (
                            <button
                              key={day.toISOString()}
                              onClick={() => handleDateClick(day)}
                              disabled={!isAvailable || !isCurrentMonth || isPastDate}
                              className={`
                                aspect-square p-2 rounded-xl text-sm font-semibold transition
                                ${!isCurrentMonth ? 'text-slate-300 cursor-not-allowed' : ''}
                                ${isSelected ? 'bg-gradient-to-r from-[#00b7ff] to-[#00d8a1] text-white shadow-lg border border-transparent' : ''}
                                ${isAvailable && isCurrentMonth && !isSelected && !isPastDate
                                  ? 'bg-white text-[#0b3f55] border border-[#c8f2ff] hover:bg-[#eafcff] cursor-pointer'
                                  : ''
                                }
                                ${(!isAvailable || isPastDate) && isCurrentMonth
                                  ? 'text-slate-300 border border-slate-100 cursor-not-allowed'
                                  : ''
                                }
                                ${!isSelected && isCurrentMonth && isAvailable && !isPastDate
                                  ? 'hover:ring-2 hover:ring-[#9aeff7]'
                                  : ''
                                }
                              `}
                            >
                              {format(day, 'd')}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Time Slots (right) */}
                    <div className="mt-6 md:mt-0">
                      <p className="text-lg font-semibold text-[#083451] mb-4">
                        {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
                        {selectedDate ? (
                          timeSlots.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleTimeClick(slot.time)}
                              className={`
                                w-full px-3 py-2 rounded-xl text-center text-sm font-semibold transition
                                ${selectedTime === slot.time
                                  ? 'bg-gradient-to-r from-[#00b7ff] to-[#00d8a1] text-white shadow border border-transparent'
                                  : 'bg-white text-[#0b3f55] border border-[#c8f2ff] hover:bg-[#eafcff]'
                                }
                              `}
                            >
                              {slot.time}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm col-span-2 sm:col-span-3">Pick a date to see available times.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timezone Selector */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time zone
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="flex-1 px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                      >
                        <option value="Asia/Kolkata">India Standard Time ({getCurrentTime()})</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        <option value="Europe/Paris">Central European Time (CET)</option>
                        <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                        <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
                      </select>
                    </div>
                  </div>

                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-semibold">✓ Booking confirmed!</p>
                      <p className="text-green-700 text-sm mt-1">Check your email for the Google Meet link.</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-semibold">Error</p>
                      <p className="text-red-700 text-sm mt-1">{submitError}</p>
                    </div>
                  )}

                  {/* Booking Form */}
                  {showBookingForm && selectedTime && !submitSuccess && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Your Demo</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Work Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.workEmail}
                              onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                              className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={formData.phoneCountryCode}
                                onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                                className="w-24 px-3 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd] text-xs"
                              >
                                <option value="+1">US +1</option>
                                <option value="+44">UK +44</option>
                                <option value="+91">India +91</option>
                                <option value="+61">Australia +61</option>
                                <option value="+65">Singapore +65</option>
                                <option value="+971">UAE +971</option>
                              </select>
                              <input
                                type="tel"
                                required
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="flex-1 min-w-0 px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                                placeholder="123 456 7890"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            What company do you represent? *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            What type of business are you representing? *
                          </label>
                          <select
                            required
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                          >
                            <option value="">Select business type</option>
                            <option value="Agency / Service Provider">Agency / Service Provider</option>
                            <option value="Brand / Advertiser">Brand / Advertiser</option>
                            <option value="Marketplace / Platform">Marketplace / Platform</option>
                            <option value="Creator / Talent Manager">Creator / Talent Manager</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            How soon are you looking to get started? *
                          </label>
                          <select
                            required
                            value={formData.readiness}
                            onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
                            className="w-full px-4 py-2 border border-[#c8f2ff] rounded-full bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                          >
                            <option value="">Select timeline</option>
                            <option value="Immediately">Immediately</option>
                            <option value="Within 1 month">Within 1 month</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6+ months">6+ months</option>
                            <option value="Just exploring">Just exploring</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message (Optional)
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-[#c8f2ff] rounded-2xl bg-white hover:bg-[#f0feff] focus:ring-2 focus:ring-[#00c3dd] focus:border-[#00c3dd]"
                            placeholder="Tell us about your needs..."
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#00b7ff] to-[#00d8a1] text-white px-6 py-3 rounded-full font-semibold hover:opacity-95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            'Confirm Booking'
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Powered By Banner */}
                <div className="mt-4 text-right">
                  <p className="inline-block bg-[#e4f9ff] text-[#0a6b84] text-xs px-3 py-1 rounded-full">
                    POWERED BY GrowRipple
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}


