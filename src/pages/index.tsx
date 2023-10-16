import { ChangeEvent, FC, useState } from 'react'

const Index: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <h1>Select Order Page</h1>
      <select onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  )
}

export default Index
