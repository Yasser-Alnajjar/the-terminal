"use client";

import * as React from "react";
import { ChevronDown, Phone } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  inputVariants,
} from "@components";
import { cn } from "@lib/utils";
import countries from "public/countries.json";
import { useLocale } from "next-intl";

interface Country {
  code: string;
  dialCode: string;
  flag: string;
  nameEn: string;
  nameAr: string;
  minLength: number;
  maxLength: number;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "default" | "error" | "warning" | "success";
  disabled?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "(59) 000-0000",
  className,
  disabled,
  variant = "default",
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const defaultCountry = countries.find((c) => c.code === "SA");
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    defaultCountry!
  );
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (value) {
      const country = countries.find((c) => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.replace(country.dialCode, "").trim());
      }
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    onChange?.(`${country.dialCode}${phoneNumber}`.trim());
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    onChange?.(`${selectedCountry.dialCode}${number}`);
  };

  return (
    <div
      className={cn("flex", "flex-row", className)}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              inputVariants({ variant }),
              "w-16 justify-between px-3 !h-10",
              locale === "ar"
                ? "rounded-l-none border-l-0"
                : "rounded-r-none border-r-0"
            )}
          >
            {selectedCountry.code}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 border-border" align={"start"}>
          <Command>
            <CommandInput
              placeholder={
                locale === "ar" ? "ابحث عن دولة" : "Search by country"
              }
              className="h-11 flex-1 bg-transparent !border-b-border"
            />
            <CommandList className="">
              <CommandEmpty>
                {locale === "ar" ? "لا توجد دولة" : "No country found."}
              </CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country[locale === "ar" ? "nameAr" : "nameEn"]} ${
                      country.code
                    }`}
                    onSelect={() => handleCountrySelect(country)}
                    className={cn(
                      "flex items-center justify-between mb-1 text-xs hover:bg-primary-25 hover:text-primary-400",
                      selectedCountry.code === country.code &&
                        "bg-primary-25 text-primary-500 hover:text-primary-500"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-nowrap">
                        {country[locale === "ar" ? "nameAr" : "nameEn"]}
                      </span>
                      <span className="text-muted-foreground">
                        ({country.dialCode})
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <label className="relative flex-1">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          disabled={disabled}
          variant={variant}
          maxLength={selectedCountry.maxLength}
          minLength={selectedCountry.minLength}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={cn(
            "!h-10",
            locale === "ar"
              ? "rounded-r-none pr-16 pl-10"
              : "rounded-l-none pl-16 pr-10",
            "focus-visible:z-10"
          )}
        />

        {/* dial code */}
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground",
            locale === "ar" ? "right-3" : "left-3"
          )}
        >
          {selectedCountry.dialCode}
        </span>

        <Phone
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground",
            locale === "ar" ? "left-3" : "right-3"
          )}
        />
      </label>
    </div>
  );
}
