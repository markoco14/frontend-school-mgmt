import AuthContext from "@/src/AuthContext";
import BackButton from "@/src/components/ui/utils/BackButton";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { ReportDetail } from "@/src/modules/reports/domain/entities/ReportDetail";
import { reportDetailAdapter } from "@/src/modules/reports/infrastructure/adapters/reportDetailAdapter";
import { format } from "date-fns";
import debounce from 'lodash.debounce';
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from 'react-textarea-autosize';

export const getServerSideProps: GetServerSideProps<{
  reportDetails: string;
}> = async (context) => {
	console.log(context)
	const reportDetails = 'Hello world'; 

  return { props: { reportDetails } };
};

export default function ReportDate({
  reportDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log('report details', reportDetails)
	const { user, selectedSchool } = useContext(AuthContext);
  return (
    <Layout>
			<BackButton />
      <div>
        <section className="pb-[48px] xs:pb-0">
          
         
        </section>
      </div>
    </Layout>
  );
}
