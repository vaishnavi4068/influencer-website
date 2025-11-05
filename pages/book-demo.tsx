import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
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
    name: '',
    email: '',
    company: '',
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
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
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
      setFormData({ name: '', email: '', company: '', message: '' })
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
        <title>Book a Demo • Microdrive.Ai</title>
      </Head>
      <Layout hideHeader>
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-emerald-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Section - Event Details */}
              <section className="order-2 lg:order-1">
                <div className="sticky top-8 rounded-3xl border border-gray-100 p-6 md:p-8 bg-white/80 backdrop-blur">
                  {/* Logo */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-teal-400 rounded"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <div className="w-3 h-3 bg-pink-400 rounded"></div>
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">Microdrive.Ai</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-8">Microdrive.ai</p>

                  {/* Event Title */}
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Demo / Intro Call
                  </h1>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">30 min</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Transform your sales with AI-powered influencer marketing. Our all-in-one platform helps you find the perfect creators, automate campaigns, and measure results in real-time.
                  </p>

                  {/* Stats */}
                  <ul className="space-y-3 mb-8">
                    <li className="text-gray-700">• 400M+ influencers worldwide</li>
                    <li className="text-gray-700">• 7+ major platforms supported</li>
                  </ul>

                  {/* Cookie Settings */}
                  <div className="mt-auto pt-8">
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700 underline">
                      Cookie settings
                    </a>
                  </div>
                </div>
              </section>

              {/* Right Section - Scheduling Interface */}
              <section className="order-1 lg:order-2">
                <div className="bg-white/90 backdrop-blur border border-gray-100 rounded-3xl p-6 md:p-8 shadow">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Select a Date & Time
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
                                aspect-square p-2 rounded-lg text-sm font-medium transition
                                ${!isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                                ${isSelected ? 'bg-purple-600 text-white' : ''}
                                ${isAvailable && isCurrentMonth && !isSelected && !isPastDate
                                  ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer'
                                  : ''
                                }
                                ${(!isAvailable || isPastDate) && isCurrentMonth
                                  ? 'text-gray-400 cursor-not-allowed hover:bg-gray-50'
                                  : ''
                                }
                                ${!isSelected && isCurrentMonth && isAvailable && !isPastDate
                                  ? 'hover:ring-2 hover:ring-purple-300'
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
                      <p className="text-lg font-semibold text-gray-900 mb-4">
                        {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
                        {selectedDate ? (
                          timeSlots.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleTimeClick(slot.time)}
                              className={`
                                w-full px-3 py-2 rounded-lg text-center text-sm font-medium transition
                                ${selectedTime === slot.time
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
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
                        className="flex-1 px-4 py-2 border border-purple-200 rounded-full bg-white hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-purple-200 rounded-full bg-white hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-purple-200 rounded-full bg-white hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-2 border border-purple-200 rounded-full bg-white hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message (Optional)
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-purple-200 rounded-2xl bg-white hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Tell us about your needs..."
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow"
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
                  <p className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded transform -rotate-2">
                    POWERED BY Microdrive.Ai
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

