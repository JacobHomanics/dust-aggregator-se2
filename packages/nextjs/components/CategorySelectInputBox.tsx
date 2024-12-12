import Image from "next/image";
import { formatEther, parseUnits } from "viem";

interface OptionInfo {
  value: string;
  label: string;
  disabled: boolean;
  tokenBalance: string;
  decimals: number;
  selected: boolean;
  usdValue: number;
  amountToDust: string;
}

interface Option {
  section: string;
  options: OptionInfo[];
}

interface Props {
  title?: string;
  options?: Option[];
  onChange?: any;
  onSelect?: any;

  selectedOption?: string;
  className?: string;
}

const CategorySelectInputBox = ({ className, title, options, selectedOption, onChange, onSelect }: Props) => {
  // const handleClick = (option: OptionInfo) => {
  //   // const elem = document.activeElement;
  //   // if (elem) {
  //   //   (elem as any)?.blur();
  //   // }

  //   if (onChange) onChange(option);
  // };

  const handleClick = (section: string, option: OptionInfo) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    onChange(section, option.value, option.selected, option.amountToDust);
  };

  function formatDecimal(input: string): string {
    const numberValue = parseFloat(input); // Convert the string to a number
    return numberValue % 1 === 0
      ? numberValue.toString() // Return as an integer if no decimal values
      : numberValue.toFixed(4).replace(/\.?0+$/, ""); // Format to 4 decimals, remove trailing zeros
  }

  return (
    <div className="dropdown w-full">
      <div
        tabIndex={0}
        role="button"
        className={`min-h-0 h-8 py-1 px-2 leading-tight shadow-inner-xl flex items-center border-2 border-slate-50 w-full text-xs select bg-[#3C3731] ${
          selectedOption ? "text-[#E4E4E4]" : "text-[#9D9D9D]"
        }`}
      >
        {title}
      </div>
      <ul
        tabIndex={0}
        className="w-full dropdown-content menu rounded-box z-[1] p-2 shadow-inner-xl mt-1 bg-[#3C3731] flex flex-col overflow-y-scroll h-32 flex-nowrap"
      >
        {options?.map(({ section, options }) => {
          return (
            <div key={section}>
              <p className="text-sm font-bold my-1 px-2">{section}</p>
              <div>
                {options.map(({ value, label, disabled, tokenBalance, usdValue, decimals, selected, amountToDust }) => {
                  // const formattedBalance = tokenBalance; // parseUnits(tokenBalance, decimals); // Number(tokenBalance) / Math.pow(10, decimals);

                  if (selected) return <div key={value}></div>;

                  return (
                    <li key={value} className={disabled ? "disabled" : ""}>
                      <a
                        onClick={() => {
                          handleClick(section, {
                            label,
                            value,
                            disabled,
                            tokenBalance,
                            usdValue,
                            decimals,
                            selected: !selected,
                            amountToDust: amountToDust,
                          });
                          // onSelect(section, value, !selected);
                          disabled = !disabled;
                        }}
                        className="text-xs text-[#9D9D9D] px-2 py-1 justify-between"
                      >
                        <p>{label}</p>
                        <div className="flex items-center justify-center gap-1">
                          <p>{formatDecimal(tokenBalance)}</p>
                          <Image src={"/particles.png"} alt="" width={"12"} height={"12"} className="h-4" />
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          <p>$</p>
                          <p>{usdValue?.toFixed(2)}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySelectInputBox;
