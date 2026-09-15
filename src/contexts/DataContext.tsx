import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { fetchData } from "../api/fetchData";
import z from "zod";
import { LegislatorSchema, type Legislator } from "../types/LegislatorSchema";
import { type LegislatorCurrent } from "../types/LegislatorCurrentSchema";
import { type LegislatorSocialMedia } from "../types/LegislatorSocialMediaSchema";
import { type LegislatorDistrictOffice } from "../types/LegislatorDistrictOfficeSchema";

type DataContextValue = {
    legislators: Legislator[] | null,
    isLoading: boolean,
    error: Error | TypeError | null,
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: PropsWithChildren) {
    const [legislators, setLegislators] = useState<Legislator[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | TypeError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            setIsLoading(true);
            setError(null);

            try {
                if (isMounted) {
                    const [currentData, socialData, officeData] = await Promise.all([
                        fetchData<LegislatorCurrent[]>('legislators-current.json'),
                        fetchData<LegislatorSocialMedia[]>('legislators-social-media.json'),
                        fetchData<LegislatorDistrictOffice[]>('legislators-district-offices.json'),
                    ]);
                    const legislatorData = currentData.map(member => ({
                        currentData: member,
                        socialData: socialData.find(item => item.id.bioguide === member.id.bioguide),
                        offices: officeData.find(item => item.id.bioguide === member.id.bioguide),
                    }));
                    const parsedData: Legislator[] = z.array(LegislatorSchema).parse(legislatorData);
                    setLegislators(parsedData);
                };
            } catch (error) {
                (isMounted && error instanceof Error)
                    ? setError(error)
                    : setError(new Error('Unknown Error'));
            } finally {
                isMounted = false;
                setIsLoading(false);
            }
        }

        loadData();
        return () => { isMounted = false; }
    }, []);

    return (
        <DataContext value={{ legislators, isLoading, error }}>
            {children}
        </DataContext>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}