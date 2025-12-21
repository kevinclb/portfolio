function Terminal() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '150px',
        backgroundColor: '#1a1a1a',
        color: '#0f0',
        fontFamily: 'monospace',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Output/history area */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>&gt;&nbsp;</span>
        <input
          type="text"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#0f0',
            fontFamily: 'monospace',
            fontSize: 'inherit',
          }}
        />
      </div>
    </div>
  )
}

export default Terminal

