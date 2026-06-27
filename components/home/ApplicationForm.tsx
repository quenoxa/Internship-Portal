"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, Loader2 } from "lucide-react";
import { PaperAirplane, ScribbleUnderline, BrushStrokeButton, PencilDoodle } from "@/components/ui/Doodles";
import { ResumeUpload } from "@/components/ui/ResumeUpload";

const domains = [
  "AI & Data Science",
  "Python Development",
  "Web Development",
  "Full Stack Development",
  "Cyber Security",
  "UI/UX Design",
  "Cloud Computing",
  "Machine Learning",
  "Data Analytics"
];

const departmentAbbreviations: Record<string, string> = {
  "ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS)": "AI & DS",
  "COMPUTER SCIENCE AND ENGINEERING (CSE)": "CSE",
  "INFORMATION TECHNOLOGY (IT)": "IT",
  "ELECTRONICS AND COMMUNICATION ENGINEERING (ECE)": "ECE",
  "ELECTRICAL AND ELECTRONICS ENGINEERING (EEE)": "EEE",
  "MECHANICAL ENGINEERING": "ME",
  "CIVIL ENGINEERING": "CE",
  "Other": "Other"
};

const formSchema = z.object({
  name: z.string().min(2, { message: "✏ Name required" }),
  linkedin: z.string().url({ message: "✏ Valid LinkedIn required" }),
  college: z.string().min(2, { message: "✏ College required" }),
  portfolio: z.string().optional(),
  department: z.string().min(2, { message: "✏ Department required" }),
  otherDepartment: z.string().optional(),
  domain: z.string().min(1, { message: "✏ Domain required" }),
  year: z.string().min(1, { message: "✏ Year required" }),
  email: z.string().email({ message: "✏ Valid email required" }),
  phone: z.string().min(10, { message: "✏ Phone required" }),
  reason: z.string().max(500, { message: "✏ Keep it under 500 characters" }).min(10, { message: "✏ Tell us a bit more" }),
  resumeUrl: z.string().min(1, { message: "✏ Resume is required" }),
}).superRefine((data, ctx) => {
  if (data.department === "Other" && (!data.otherDepartment || data.otherDepartment.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "✏ Please specify your department",
      path: ["otherDepartment"],
    });
  }
});

export function ApplicationForm({ onProgressChange, progress }: { onProgressChange: (progress: number) => void, progress: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", linkedin: "", college: "", portfolio: "", department: "", otherDepartment: "",
      domain: "", year: "", email: "", phone: "", reason: "", resumeUrl: ""
    },
    mode: "onChange"
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      let completed = 0;
      const totalFields = 11;
      
      if (value.name) completed++;
      if (value.linkedin) completed++;
      if (value.college) completed++;
      if (value.department) completed++;
      if (value.domain) completed++;
      if (value.year) completed++;
      if (value.email) completed++;
      if (value.phone) completed++;
      if (value.reason) completed++;
      if (value.resumeUrl) completed++;
      if (value.portfolio) completed++; // Bonus

      const pct = Math.min(Math.round((completed / totalFields) * 100), 100);
      onProgressChange(pct);
    });
    return () => subscription.unsubscribe();
  }, [form, onProgressChange]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Map form values to the required Google Apps Script format
      const sheetPayload = {
        studentName: values.name,
        email: values.email,
        phone: values.phone,
        collegeName: values.college,
        department: values.department === "Other" ? (values.otherDepartment || "Other") : values.department,
        year: values.year,
        preferredDomain: values.domain,
        linkedin: values.linkedin,
        portfolio: values.portfolio || "",
        resumeUrl: values.resumeUrl,
        whyInternship: values.reason,
      };

      // 3. Send POST request to Next.js API route proxy
      const response = await fetch("/api/submit-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit to Google Sheets.");
      }

      const sheetResult = await response.json();
      if (!sheetResult.success) {
        throw new Error(sheetResult.error || "Google Sheets submission failed.");
      }

      // 4. Update states on success
      setSubmittedEmail(values.email);
      setApplicationId(sheetResult.applicationId);
      setIsSuccess(true);
      onProgressChange(100);
      form.reset();
    } catch (e: any) {
      console.error("Submission Error:", e);
      setSubmitError(e.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4 max-w-lg mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative inline-block mb-6"
        >
          <span className="text-7xl block animate-bounce">🎉</span>
        </motion.div>
        
        <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-brand-black">
          Application Submitted Successfully
        </h3>
        
        {/* Application ID Card with notebook/journal style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full my-6 p-6 rounded-2xl bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#111] overflow-visible"
        >
          {/* Notebook line decoration */}
          <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-200 pointer-events-none" />
          
          <div className="pl-6 text-left">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Your Application Reference
            </span>
            <div className="font-heading text-xl md:text-2xl font-black text-brand-black flex items-center gap-2">
              ID:{" "}
              <span className="bg-[#E2F7C2] px-2 py-0.5 rounded border border-dashed border-zinc-400 font-sans tracking-wide">
                {applicationId}
              </span>
            </div>
          </div>
        </motion.div>

        <p className="font-sans text-zinc-600 leading-relaxed mb-8">
          Thank you for applying to Quenoxa Global Technologies! Your application has been successfully recorded in our system. Our team will review your profile and contact you soon.
        </p>

        {submittedEmail && (
          <p className="text-sm font-medium text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full inline-flex items-center gap-2">
            📧 Check <span className="font-bold text-zinc-700">{submittedEmail}</span> for updates.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="font-sans w-full max-w-3xl mx-auto pb-10">
      
      {/* Header & Progress */}
      <div className="flex justify-between items-start mb-10">
        <div className="relative inline-block">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-black flex items-center gap-4">
            Let's Get Started
            <PaperAirplane className="w-8 h-8 text-zinc-500 transform -rotate-12" />
          </h2>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-[60%] text-[#6DFF33]" />
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-bold text-zinc-500">Page Progress</span>
          <div className="flex items-center gap-3">
            <div className="w-32 h-3 rounded-full border border-zinc-400 p-[1px] bg-transparent overflow-hidden">
              <motion.div 
                className="h-full bg-[#6DFF33] rounded-full"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm font-bold w-8">{progress}%</span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-sm text-brand-black">Student Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                  </FormControl>
                  <FormMessage className="font-caveat text-brand-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-sm text-brand-black">LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="linkedin.com/in/yourprofile" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                  </FormControl>
                  <FormMessage className="font-caveat text-brand-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-sm text-brand-black">College Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your college name" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                  </FormControl>
                  <FormMessage className="font-caveat text-brand-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-sm text-brand-black">Portfolio / GitHub</FormLabel>
                  <FormControl>
                    <Input placeholder="github.com/yourusername" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                  </FormControl>
                  <FormMessage className="font-caveat text-brand-error" />
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-sm text-brand-black mb-2 block">Department <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger title={field.value} className="border border-zinc-300 rounded-md bg-white shadow-sm focus:ring-[#6DFF33] h-12 font-sans truncate whitespace-nowrap">
                          <SelectValue placeholder="Select your department">
                            {field.value ? departmentAbbreviations[field.value] || field.value : undefined}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-[calc(100vw-32px)] md:w-auto md:min-w-[380px] max-w-[500px]">
                        <SelectItem value="ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS)" title="ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS)" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Artificial Intelligence & Data Science (AI & DS)</SelectItem>
                        <SelectItem value="COMPUTER SCIENCE AND ENGINEERING (CSE)" title="COMPUTER SCIENCE AND ENGINEERING (CSE)" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Computer Science and Engineering (CSE)</SelectItem>
                        <SelectItem value="INFORMATION TECHNOLOGY (IT)" title="INFORMATION TECHNOLOGY (IT)" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Information Technology (IT)</SelectItem>
                        <SelectItem value="ELECTRONICS AND COMMUNICATION ENGINEERING (ECE)" title="ELECTRONICS AND COMMUNICATION ENGINEERING (ECE)" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Electronics and Communication Engineering (ECE)</SelectItem>
                        <SelectItem value="ELECTRICAL AND ELECTRONICS ENGINEERING (EEE)" title="ELECTRICAL AND ELECTRONICS ENGINEERING (EEE)" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Electrical and Electronics Engineering (EEE)</SelectItem>
                        <SelectItem value="MECHANICAL ENGINEERING" title="MECHANICAL ENGINEERING" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Mechanical Engineering (ME)</SelectItem>
                        <SelectItem value="CIVIL ENGINEERING" title="CIVIL ENGINEERING" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Civil Engineering (CE)</SelectItem>
                        <SelectItem value="Other" title="Other" className="whitespace-normal break-words py-2 px-3 leading-5 min-h-[44px]">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-caveat text-brand-error" />
                  </FormItem>
                )}
              />

              {form.watch("department") === "Other" && (
                <FormField
                  control={form.control}
                  name="otherDepartment"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="font-bold text-sm text-brand-black mb-2 block">Specify Department <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Type your department name" 
                          {...field} 
                          className="border-2 border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] h-12 font-sans"
                        />
                      </FormControl>
                      <FormMessage className="font-caveat text-brand-error" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-sm text-brand-black mb-2 block">Preferred Domain <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger title={field.value} className="border border-zinc-300 rounded-md bg-white shadow-sm focus:ring-[#6DFF33] h-12 font-sans truncate whitespace-nowrap">
                          <SelectValue placeholder="Select your domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {domains.map((d) => (
                          <SelectItem key={d} value={d} title={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-caveat text-brand-error" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-sm text-brand-black">Year <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-zinc-300 rounded-md bg-white shadow-sm focus:ring-[#6DFF33] h-10 font-sans">
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-caveat text-brand-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-sm text-brand-black">Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="youremail@example.com" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                    </FormControl>
                    <FormMessage className="font-caveat text-brand-error" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-sm text-brand-black">Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" className="border border-zinc-300 rounded-md bg-white shadow-sm focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] font-sans h-10" {...field} />
                    </FormControl>
                    <FormMessage className="font-caveat text-brand-error" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="resumeUrl"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col h-full">
                  <FormLabel className="font-bold text-sm text-brand-black mb-1">
                    Resume Upload <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex-1 flex items-stretch">
                      <ResumeUpload 
                        value={field.value} 
                        onChange={field.onChange} 
                        error={fieldState.error?.message}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="font-caveat text-brand-error mt-1" />
                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm text-brand-black">Why do you want this internship? <span className="text-red-500">*</span></FormLabel>
                <p className="text-xs text-zinc-500 mb-2">Share your goals, interest, and what you hope to learn.</p>
                <FormControl>
                  <div className="relative">
                    <Textarea 
                      placeholder="Type your answer here..." 
                      className="border border-zinc-300 bg-white rounded-md focus-visible:ring-[#6DFF33] focus-visible:border-[#6DFF33] shadow-sm font-sans resize-none h-32 pb-8 pr-12" 
                      {...field} 
                    />
                    <PencilDoodle className="absolute top-4 right-4 w-5 h-5 text-zinc-400 pointer-events-none opacity-50" />
                    <div className="absolute bottom-2 right-3 text-xs text-zinc-400 font-medium">
                      {field.value.length} / 500
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="font-caveat text-brand-error mt-1" />
              </FormItem>
            )}
          />

          {submitError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50/80 backdrop-blur-sm text-red-600 font-sans text-sm flex items-start gap-3 shadow-sm"
            >
              <span className="text-base">⚠️</span>
              <div className="flex-1">
                <p className="font-bold">Submission Failed</p>
                <p className="text-zinc-600 mt-0.5">{submitError}</p>
              </div>
            </motion.div>
          )}

          <div className="pt-10 flex flex-col items-center">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full max-w-sm mx-auto md:w-auto group relative flex items-center justify-center gap-4 bg-[#2F2F2F] font-caveat text-3xl h-auto py-4 px-10 rounded-xl hover:-translate-y-1 transition-all duration-300 overflow-visible z-10 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:hover:translate-y-0"
            >
              {/* Hand-drawn clean border layers */}
              <div className="absolute inset-0 border-[1.5px] border-[#111111] rounded-xl rounded-tr-[14px] rounded-bl-[12px] rotate-[0.5deg] scale-[1.01] pointer-events-none opacity-40"></div>
              <div className="absolute inset-0 border border-[#111111] rounded-xl rounded-tl-[10px] rounded-br-[10px] -rotate-[0.5deg] scale-[1.02] pointer-events-none opacity-30"></div>
              
              {/* Thin Neon Green Accent Highlight underneath */}
              <div 
                className="absolute -bottom-1 -left-1 -right-1 h-3 bg-[#6DFF33] -z-10 rotate-[0.3deg] opacity-90 group-hover:-bottom-1.5 group-hover:opacity-100 group-hover:shadow-[0_4px_15px_rgba(109,255,51,0.4)] transition-all duration-300 rounded-sm" 
                style={{ clipPath: 'polygon(1% 15%, 99% 5%, 98% 100%, 0% 90%)' }}
              ></div>

              {isSubmitting ? (
                <Loader2 className="w-7 h-7 text-[#6DFF33] animate-spin" />
              ) : (
                <PaperAirplane className="w-7 h-7 text-[#6DFF33] -rotate-12 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              )}
              <span className="relative z-10 pt-1 font-bold text-white tracking-wide drop-shadow-sm">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </span>
              {!isSubmitting && (
                <svg className="w-7 h-7 text-[#6DFF33] group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              )}
            </Button>
            
            <p className="mt-6 text-sm font-sans text-brand-black">
              We'll review your application and get back to you within <span className="bg-[#E2F7C2] px-1 font-bold">24-48 hours</span>.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
